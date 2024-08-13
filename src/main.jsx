
import Game from './Events/TicTacToe/Game'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider, useNavigate } from 'react-router-dom'

const Lobby = ()=>{
  const navigate = useNavigate()
  return <div>Lobby
    <button onClick={()=>{
      navigate('/newSession')
    }}> take me to the game</button>
  </div>
}

const router = createBrowserRouter([
  {path:'/:sessionID', element:<Game></Game>},
  {path:'/lobby', element: <Lobby/>},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)


/**
 * createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)
 */