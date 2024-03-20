import { useEffect, useState } from 'react'
import Cell from './Cell.jsx'
import PropTypes from 'prop-types'

export default function GameBoard({ settings }) {
  const [board, setBoard] = useState([])

  const initializeBoard = size => {
    return Array(size)
      .fill(null)
      .map(() =>
        Array(size).fill({
          value: '',
          constraints: { right: '', bottom: '' }
        })
      )
  }

  const generateBoard = settings => {
    const size = parseInt(settings.size)
    if (!size) return []

    const newBoard = initializeBoard(size)
    setBoard(newBoard)
  }

  useEffect(() => {
    generateBoard(settings)
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
