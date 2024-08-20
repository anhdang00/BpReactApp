/* eslint-disable react/prop-types */
import Cell from './Cell'
import { TIC_TAC_TOE } from './constants'

export default function Board({ disablePlayerMove, boardState, onPlayerMove, ...props }) {
  //gameboard styling
  const styleObj = {
    display: 'flex',
    flexFlow: 'row wrap',
    width: 'calc(var(--cellSize) * 3)',
    height: 'calc(var(--cellSize) * 3)',
    margin: 'auto',
  }

  return (
    <>
      <div style={styleObj}>
        {TIC_TAC_TOE.map((row, i) => {
          return row.map((cell, j) => {
            return (
              <Cell
                key={`${i}-${j}`}
                //only allow players to make a move when it's their turn
                onClick={!disablePlayerMove ? () => onPlayerMove(i, j) : null}
                symbol={boardState[i][j]}
                disabled={disablePlayerMove}
              />
            )
          })
        })}
      </div>
    </>
  )
}