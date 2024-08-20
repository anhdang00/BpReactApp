

export default function Cell( {onClick, symbol, disabled, ...props}){
  return (
    <div className="cell" onClick={onClick} style={{ cursor: disabled ? 'not-allowed' : '' }}>
      {symbol}
    </div>
  )
}