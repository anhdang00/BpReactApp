import Cell from "./Cell"
import { TIC_TAC_TOE } from "./constants"

export default function Board(setBoardState, isXNext, setIsXNext, boardState,...props){
    const styleObj={
        display:'flex',
        flexFlow:'row wrap',
        width:'calc(var(--cellSize)*3)',
        height:'calc(var(--cellSize)*3)'
      }
      
    return (
        <div style={styleObj}>
      {TIC_TAC_TOE.map((row,i) => {
        return row.map((cell,j) =>{
          return (
            <Cell 
              key={`${i} - ${j}`}
              onClick={() =>{
                setBoardState(bs=>{
                  const symbolToPut= isXNext?'X':'O';
                  setIsXNext(!isXNext)
                  return [
                    ...bs.slice(0,i),
                    [...bs[i].slice(0,j),symbolToPut,...bs[i].slice(j+1)],
                    ...bs.slice(i+1)]
                  })
                }}
                    symbol={boardState[i][j]}
            /> 
          )      
        })       
      })}
    </div>
    )
}