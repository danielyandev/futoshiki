import { useEffect, useState } from 'react'
import Cell from './Cell.jsx'
import PropTypes from 'prop-types'
import { generateSolvedBoard } from '../helpers/generator.js'
import {
  addConstraintsBasedOnSolvedBoard,
  cellIndexToSting,
  selectRandomCells
} from '../helpers/board.js'

export default function GameBoard({ settings }) {
  const [board, setBoard] = useState([])

  useEffect(() => {
    prepareBoard()
  }, [settings])

  const prepareBoard = () => {
    // TODO update based on size and level
    const visibleCellsCount = 2
    const constraintsCount = 4

    const solvedBoard = generateSolvedBoard(settings)

    const visibleCells = selectRandomCells(solvedBoard, visibleCellsCount)
    const constraints = addConstraintsBasedOnSolvedBoard(
      solvedBoard,
      constraintsCount
    )

    const prepared = solvedBoard.map((row, rowIndex) =>
      row.map((column, columnIndex) => {
        let right = ''
        let bottom = ''

        for (const constraint of constraints) {
          if (constraint.row === rowIndex && constraint.col === columnIndex) {
            if (constraint.isVertical) {
              bottom = constraint.constraint
            } else {
              right = constraint.constraint
            }
          }
        }

        return {
          value: visibleCells.includes(cellIndexToSting(rowIndex, columnIndex))
            ? column
            : '',
          constraints: { right, bottom }
        }
      })
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
