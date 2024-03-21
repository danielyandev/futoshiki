import { useEffect, useState } from 'react'
import Cell from './Cell.jsx'
import PropTypes from 'prop-types'
import { generateSolvedBoard } from '../helpers/generator.js'
import { getPreparedBoard } from '../helpers/board.js'

export default function GameBoard({ settings }) {
  const [board, setBoard] = useState([])

  useEffect(() => {
    prepareBoard()
  }, [settings])

  const prepareBoard = () => {
    const solvedBoard = generateSolvedBoard(settings)

    const prepared = getPreparedBoard(solvedBoard, settings)

    setBoard(prepared)
  }

  return (
    <div className="d-flex justify-content-center align-items-start">
      <div className="mt-5">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex">
            {row.map((cell, colIndex) => (
              <Cell key={colIndex} cell={cell} maxValue={settings.size} />
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
