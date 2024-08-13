import { useMemo, useState } from 'react'
import './styles.css'
import { TIC_TAC_TOE } from './constants'
import calculateWinner from './utils'
import Board from './Board'

function Game() {
  
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
    const dataset = new Array(9).fill(null).map((_, idx) =>{
      if (xRows.includes(idx)){
        return 'X'
      }else if (oRows.includes(idx)){
        return 'O'
      }
    })
    
    return calculateWinner(dataset)
  },[boardState,isXNext])
  
  
  return <div>
    <h1>Tic Tac Toe</h1>
    <h3>Winner is {displayWinner}</h3>
    <Board setBoardState={setBoardState} isXNext={isXNext} setIsXNext={setIsXNext} boardState={boardState}/>
  </div>
    
}

export default Game

