

export default function Cell( {onClick, symbol, ...props}){
  return <div className='cell' onClick={onClick}>
        {symbol}
      </div>

}