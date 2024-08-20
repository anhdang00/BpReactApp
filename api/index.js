const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const { GAME_STAGE } = require('./enum')
const { TIC_TAC_TOE } = require('./game')
const cors = require('cors')
const app = express()

//set up bypass for CORS
app.use(cors())

const expressServer = createServer(app)
const io = new Server(expressServer, {
  cors: { origin: 'http://localhost:5173' },
  methods: ['GET', 'POST'],
})

app.get('/', (request, response) => {
  const params = request.params 
  const query = request.query.id 
  response.send('<h1>hello</h1>')
})
app.get('/status', (request, response) => {
  response.send('<h1 style="color:red">we are healthy</h1>')
})
app.get('/users', (request, response) => {
  response.send(users.map(user => `<h1>${user}</h1>`).join(''))
})
app.get('/events/:id', (request, response) => {
  const eventId = request.params.id
  const event = events.find(event => event.id === eventId)
  return response.json(event || null)
})
//3000 is the port number
expressServer.listen(3000, () => {
  console.log('server running at 3000')
})

const users = []
const userMap = {}
const events = []

const EVENT_USER_JOIN = 'userJoin'
const CLIENT_EVENT_LIST_EVENTS = 'client_listEvents'
const SERVER_EVENT_LIST_EVENTS = 'server_listEvents'
const EVENT_SUBSCRIBE = 'subscribeEvent'
const EVENT_PLAYER_JOIN = 'joinEvent'

const EVENT_CREATE_EVENT = 'createEvent'
const EVENT_UPDATE_EVENT = 'updateEvent'

io.on('connection', socket => {
  socket.on(EVENT_USER_JOIN, userName => {
    console.log(userName, ' just joined')
    users.push(userName)
    userMap[userName] = {}
  })

  socket.on(SERVER_EVENT_LIST_EVENTS, () => {

    //this variable doesn't have to be the same as above
    socket.emit(CLIENT_EVENT_LIST_EVENTS, events)
  })

  socket.on(EVENT_CREATE_EVENT, (payload, webRedirectCallBack) => {
    const { userName, eventType } = payload
    const event = {
      id: `${eventType}_${new Date().getTime()}`,
      players: [userName],
      type: eventType,
      stage: GAME_STAGE.INIT,
      currentMove: 0,
      history: [TIC_TAC_TOE],
      playerReady: [],
      symbolMap: {},
    }
    events.push(event)
    
    const eventId = event.id
    socket.join(eventId)

    //telling the all connected web clients to receive events
    socket.broadcast.emit(CLIENT_EVENT_LIST_EVENTS, events)
    if (event.type === 'Tic-Tac-Toe') webRedirectCallBack(event.id)
  })

  socket.on(EVENT_PLAYER_JOIN, ({ userName, eventId }, callback) => {
    const event = events.find(event => event.id === eventId)
    //add user to join an event
    event.players.push(userName)

    //unite the players list to avoid duplicate userIds
    event.players = Array.from(new Set(event.players))
    userMap[userName] = {}

    //support the guest player join into the room
    socket.join(eventId)
    io.to(eventId).emit(EVENT_SUBSCRIBE, event)
    socket.broadcast.emit(CLIENT_EVENT_LIST_EVENTS, events)
  })

  socket.on(EVENT_UPDATE_EVENT, ({ eventId, type }, metadata) => {
    console.log({ eventId, type }, metadata)
    const event = events.find(event => event.id === eventId)

    let userName
    switch (type) {
      case 'gameEnd':
        event.stage = GAME_STAGE.END
        event.winner = metadata.winner
        break
      case 'gameMove':
        const nextGameState = metadata.gameState
        event.history.push(nextGameState)
        event.currentMove = event.history.length - 1
        break
      case 'playerReady':
        userName = metadata.userName
        event.playerReady.push(userName)

        //start the game when two players are ready
        if (event.playerReady.length === 2) {
          event.stage = GAME_STAGE.START
          const _rand = Math.random() < 0.5
          event.symbolMap = {
            [event.players[0]]: _rand ? 'X' : 'O',
            [event.players[1]]: _rand ? 'O' : 'X',
          }
        }
        break
      case 'playerLeave':
        userName = metadata.userName
        const isOwner = event.players.indexOf(userName) === 0
        event.players = event.players.filter(player => player !== userName)
        //if the player is owner, delete the event
        if (isOwner) {
          const idx = events.findIndex(event => event.id === eventId)
          events.splice(idx, 1)
          socket.broadcast.emit(CLIENT_EVENT_LIST_EVENTS, events)
        }
      default:
        break
    }

    io.to(eventId).emit(EVENT_SUBSCRIBE, event)
  })
})