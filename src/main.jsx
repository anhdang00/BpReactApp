
import Game from './Events/TicTacToe/Game'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {path:'/', element:<Game></Game>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)


/**

 */