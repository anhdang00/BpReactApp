import { useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const TIC_TAC_TOE = new Array(3).fill(new Array(3).fill(null))

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

  const styleObj={
    display:'flex',
    flexFlow:'row wrap',
    width:'calc(var(--cellSize)*3)',
    height:'calc(var(--cellSize)*3)'
  }

  return <div>
    <h1>Tic Tac Toe</h1>
    <h3>Winner is {displayWinner}</h3>
    <div style={styleObj}>
      {TIC_TAC_TOE.map((row,i) => {
        return row.map((cell,j) =>{
          return (
            <div 
              key={`${i} - ${j}`}
              className='cell' 
              onClick={() =>{
                setBoardState(bs=>{
                  const symbolToPut= isXNext?'X':'O';
                  setIsXNext(!isXNext)
                  return [
                    ...bs.slice(0,i),
                    [...bs[i].slice(0,j),symbolToPut,...bs[i].slice(j+1)],
                    ...bs.slice(i+1)]
                })
              }}>
                {boardState[i][j]}
            </div>
          )
        })
        
      }

    )}
    </div>
  </div>

    
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default App
