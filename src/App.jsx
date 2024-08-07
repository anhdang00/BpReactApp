import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const TIC_TAC_TOE = new Array(3).fill(new Array(3).fill(null))

  const [boardState, setBoardState] = useState(TIC_TAC_TOE)

  const [isXNext,  setIsXNext]=useState(true)
  return <div>
    <h1>Tic Tac Toe</h1>
    <div style={{
      display:'flex',
      flexFlow:'row wrap',
      width:'150px',
      height:'150px'
    }}>
      {TIC_TAC_TOE.map(
      (row,i) => {
        return row.map((cell,j) =>{
          return <div className='cell' onClick={() =>{
            setBoardState(bs=>{
              return [
                ...bs.slice(0,i),
                [...bs[i].slice(0,j),'X',...bs[i].slice(j+1)],
                ...bs.slice(i+1)]
            })
          }}>
            {boardState[i][j]}
          </div>
        })
        
      }

    )}
    </div>
  </div>

    
}

export default App
