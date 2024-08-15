const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const app = express()
const expressServer = createServer(app)
const io = new Server(expressServer, {
  cors: { origin: 'http://localhost:5173' },
  methods: ['GET', 'POST'],
})

app.get('/', (request, response) => {
  const params = request.params // id=1231232131
  const query = request.query.id //abc
  response.send('<h1>hello</h1>')
})
app.get('/status', (request, response) => {
  response.send('<h1 style="color:red">we are healthy</h1>')
})
app.get('/users', (request, response) => {
  response.send(users.map(user => `<h1>${user}</h1>`).join(''))
})
//3000 is the port number
expressServer.listen(3000, () => {
  console.log('server running at 3000')
})

const users = []
const userMap = {}
const events = []

const EVENT_USER_JOIN = 'userJoin'
const EVENT_LIST_EVENTS = 'listEvents'
const EVENT_CREATE_EVENT = 'createEvent'
io.on('connection', socket => {
  socket.on(EVENT_USER_JOIN, userName => {
    console.log(userName, ' just joined')
    users.push(userName)
    userMap[userName] = {}
  })

  socket.on(EVENT_LIST_EVENTS, () => {
    //this variable doesn't have to be the same as above
    socket.emit(EVENT_LIST_EVENTS, events)
  })

  socket.on(EVENT_CREATE_EVENT, (payload, callbackFunc) => {
    const { userName, eventType } = payload
    const event = { id: `${new Date().getTime()}_event`, players: [userName], type: eventType }
    events.push(event)
    if (event.type === 'Tic-Tac-Toe') callbackFunc(event.id)
  })
})