import { useCallback, useEffect, useMemo, useState } from 'react'
import './styles.css'
import { TIC_TAC_TOE } from './constants'
import Board from './Board'
import calculateWinner from './utils'
import { socket } from '../../main'
import { EVENT_SUBSCRIBE, EVENT_UPDATE_EVENT } from '../../constants/socket'
import { useLocation, useNavigate } from 'react-router-dom'
import { GAME_STAGE } from '../../constants/game'
import useAuth from '../../Auth/useAuth'
import Init from './BoardContent/Init'
import StartAndEnd from './BoardContent/StartAndEnd'

function Game() {
  const navigate = useNavigate()
  const userName = useAuth()
  const location = useLocation()
  const [gameMetadata, setGameMeta] = useState({})
  const [boardState, setBoardState] = useState(TIC_TAC_TOE)
  const [isXNext, setIsXNext] = useState(true)
  const eventId = useMemo(() => location.pathname.slice(1), [location.pathname]) // strip off the first character '/'

  useEffect(() => {
    try {
      fetch(`http://localhost:3000/events/${eventId}`).then(async res => {
        //data = event || null  [from API response]
        const data = await res.json()
        if (!data) {
          navigate('/')
        }
        setGameMeta(data)
        const currentBoardState = data.history[data.currentMove]
        setBoardState(currentBoardState)
      })
    } catch (err) {
      navigate('/')
    }
  }, [location.pathname, eventId, navigate])

  useEffect(() => {
    const eventSubscriber = data => {
      //data = event [from API web socket]
      setGameMeta(data)
      const currentBoardState = data.history[data.currentMove]
      setIsXNext(data.currentMove % 2 === 0)
      setBoardState(currentBoardState)
    }
    const sub = socket.on(EVENT_SUBSCRIBE, eventSubscriber)
    return () => {
      socket.off(EVENT_SUBSCRIBE, sub)
    }
  }, [])

  const displayWinner = useMemo(() => {
    const xRows = [],
      oRows = []
    boardState.map((row, i) => {
      row.map((cell, j) => {
        //j:0,1,2
        if (cell === 'X') {
          xRows.push(i * 3 + j)
        } else if (cell === 'O') {
          oRows.push(i * 3 + j)
        }
      })
    })

    const dataset = new Array(9).fill(null).map((_, idx) => {
      //Array.includes :detect whether an element is inside of array, this only works when array and element are prime type
      if (xRows.includes(idx)) {
        return 'X'
      } else if (oRows.includes(idx)) {
        return 'O'
      }
    })
    return calculateWinner(dataset)
  }, [boardState])

  useEffect(() => {
    if (displayWinner) {
      socket.emit(EVENT_UPDATE_EVENT, { eventId, type: 'gameEnd' }, { winner: displayWinner })
    }
  }, [displayWinner, eventId])

  const onPlayerReady = useCallback(() => {
    socket.emit(EVENT_UPDATE_EVENT, { eventId, type: 'playerReady' }, { userName })
  }, [eventId, userName])

  //handle event when user leaves
  useEffect(() => {
    const beforeUnloadListener = () => {
      if (eventId) {
        socket.emit(EVENT_UPDATE_EVENT, { eventId, type: 'playerLeave' }, { userName })
      }
    }

    window.addEventListener('beforeunload', beforeUnloadListener)
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadListener)
    }
  }, [eventId, navigate, userName])

  const onPlayerMove = useCallback(
    async (row, col) => {
      const bs = boardState
      const symbolToPut = isXNext ? 'X' : 'O'
      const gameState = [
        ...bs.slice(0, row),
        [...bs[row].slice(0, col), symbolToPut, ...bs[row].slice(col + 1)],
        ...bs.slice(row + 1),
      ]

      socket.emit(
        EVENT_UPDATE_EVENT,
        { eventId, type: 'gameMove' },
        {
          gameState,
        },
      )
    },
    [boardState, eventId, isXNext],
  )
  const disablePlayerMove = useMemo(() => {
    if (!gameMetadata.symbolMap) return true

    const playerSymbol = gameMetadata.symbolMap[userName]
    const nextSymbol = isXNext ? 'X' : 'O'
    return playerSymbol !== nextSymbol
  }, [gameMetadata, isXNext, userName])

  const boardComponent = useMemo(() => {
    if (gameMetadata.stage === GAME_STAGE.INIT) {
      return <Init {...{ gameMetadata, userName, eventId, onPlayerReady }} />
    } else if (gameMetadata.stage === GAME_STAGE.START || gameMetadata.stage === GAME_STAGE.END) {
      return (
        <StartAndEnd
          {...{
            displayWinner,
            isXNext,
            boardState,
            onPlayerMove,
            disablePlayerMove,
            gameMetadata,
            userName,
          }}
        />
      )
    }
  }, [
    boardState,
    disablePlayerMove,
    displayWinner,
    eventId,
    gameMetadata,
    isXNext,
    onPlayerMove,
    onPlayerReady,
    userName,
  ])
  return (
    <div style={{ textAlign: 'center', color:'#CB764C' }}>
      <h1>Tic Tac Toe</h1>
      {boardComponent}
    </div>
  )
}

export default Game