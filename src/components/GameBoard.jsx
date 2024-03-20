import { useEffect, useState } from 'react'
import Cell from './Cell.jsx'
import PropTypes from 'prop-types'

export default function GameBoard({ settings }) {
  const generateInitialBoard = ({ size }) => {
    if (!size) return []

    size = parseInt(size)
    const board = Array(size)
      .fill(null)
      .map(() =>
        Array(size).fill({
          value: '',
          constraints: { right: null, bottom: null }
        })
      )

    // Example strategy for adding constraints randomly
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        // Randomly decide whether to place a constraint to the right and bottom
        // Skipping the last row and column for respective directions to avoid out-of-bounds
        if (col < size - 1 && Math.random() > 0.5) {
          // 50% chance of right constraint
          board[row][col].constraints.right = Math.random() > 0.5 ? '>' : '<'
        }
        if (row < size - 1 && Math.random() > 0.5) {
          // 50% chance of bottom constraint
          board[row][col].constraints.bottom = Math.random() > 0.5 ? '>' : '<'
        }
      }
    }
    return board
  }

  const [board, setBoard] = useState([])

  useEffect(() => {
    setBoard(generateInitialBoard(settings))
  }, [settings])

  return (
    <div className="d-flex justify-content-center align-items-start">
      <div className="mt-5">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex">
            {row.map((cell, colIndex) => (
              <Cell key={colIndex} cell={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

GameBoard.propTypes = {
  settings: PropTypes.exact({
    size: PropTypes.string,
    level: PropTypes.string
  }).isRequired
}
