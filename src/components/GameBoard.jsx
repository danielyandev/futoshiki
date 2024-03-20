import { useEffect, useState } from 'react'
import Cell from './Cell.jsx'
import PropTypes from 'prop-types'
import { generateSolvedBoard } from '../helpers/generator.js'
import { cellIndexToSting, selectRandomCells } from '../helpers/board.js'

export default function GameBoard({ settings }) {
  const [board, setBoard] = useState([])

  useEffect(() => {
    prepareBoard()
  }, [settings])

  const prepareBoard = () => {
    const solvedBoard = generateSolvedBoard(settings)

    const visibleCellsCount = 2
    const visibleCells = selectRandomCells(solvedBoard, visibleCellsCount)
    const prepared = solvedBoard.map((row, rowIndex) =>
      row.map((column, columnIndex) => ({
        value: visibleCells.includes(cellIndexToSting(rowIndex, columnIndex))
          ? column
          : '',
        constraints: { right: '', bottom: '' }
      }))
    )

    setBoard(prepared)
  }

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
