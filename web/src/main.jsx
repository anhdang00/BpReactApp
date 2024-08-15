import React from 'react'
import ReactDOM from 'react-dom/client'
import Game from './Events/TicTacToe/Game.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Lobby from './Lobby/index.jsx'
import App from './App.jsx'
import AuthProvider from './Auth/AuthProvider.jsx'
import {io} from 'socket.io-client'

const URL = 'http://localhost:3000'
export const socket = io(URL)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/:sessionId', element: <Game /> },
      { path: '/', element: <Lobby /> },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)