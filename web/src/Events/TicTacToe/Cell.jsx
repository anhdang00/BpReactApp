

export default function Cell( {onClick, symbol, ...props}){
  return (
    <div className="cell" onClick={onClick} style={{ cursor: disabled ? 'not-allowed' : '' }}>
      {symbol}
    </div>
  )
}