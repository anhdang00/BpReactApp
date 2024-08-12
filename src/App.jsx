import { useMemo, useState } from 'react'
import './App.css'
import { TIC_TAC_TOE } from './events/TicTacToe/constants'
import Board from './events/TicTacToe/Board'

function App() {

  const [boardState, setBoardState] = useState(TIC_TAC_TOE)

  const [isXNext,  setIsXNext]=useState(true)

  const displayWinner = useMemo(()=>{
    const xRows=[], oRows=[];

    boardState.map((row,i)=>{
      row.map((cell,j)=>{
        if(cell==='X'){
          xRows.push(i*3+j)
        }else if (cell === 'O'){
          oRows.push(i*3+j)
        }
      })
    })
    return 'X'
  },[boardState,isXNext])

  return <div>
    <h1>Tic Tac Toe</h1>
    <h3>Winner is {displayWinner}</h3>
    <Board setBoardState={setBoardState} isXNext={isXNext} setIsXNext={setIsXNext} boardState={boardState}/>
  </div>

    
}




export default App
