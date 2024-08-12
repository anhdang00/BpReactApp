export default function Cell(){
    return <div 
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
}