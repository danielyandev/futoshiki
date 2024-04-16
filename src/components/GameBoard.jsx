import { useEffect, useState } from 'react'
import Cell from './Cell.jsx'
import PropTypes from 'prop-types'
import { generateSolvedBoard } from '../helpers/generator.js'
import { getBoardCopy, getPreparedBoard } from '../helpers/board.js'
import SolutionValidator from './SolutionValidator.jsx'
import { solveWithBacktracking } from '../solvers/backtracking.js'
import { hillClimbingSolver } from '../solvers/hillclimbing.js'

export default function GameBoard({ settings }) {
  const [board, setBoard] = useState([])

  useEffect(() => {
    prepareBoard()
  }, [settings])

  /**
   * Generate a solved board and try to adjust constraints
   * so that the solution is unique.
   * If adjusting constraints does not help, regenerate a solved board
   * and repeat everything again
   */
  const prepareBoard = () => {
    const solvedBoard = generateSolvedBoard(settings)
    const prepared = getPreparedBoard(solvedBoard, settings)

    setBoard(prepared)
  }

  const handleCellChange = (value, row, col) => {
    if (value) {
      value = parseInt(value)
    }

    const newBoard = board.map((r, rIndex) => {
      if (rIndex !== row) return r

      return r.map((c, cIndex) => {
        if (cIndex !== col) return c

        return {
          ...c,
          value
        }
      })
    })
    setBoard(newBoard)
  }

  const handleSolveWithBacktracking = () => {
    const boardCopy = getBoardCopy(board)
    solveWithBacktracking(boardCopy)
    setBoard(boardCopy)
  }

  const handleSolveWithLowestDescent = () => {
    const boardCopy = getBoardCopy(board)
    const a = hillClimbingSolver(boardCopy)
    setBoard(a)
  }

  return (
    <div>
      <div className="row justify-content-center">
        <h5 className="text-center">Choose an algorithm to solve</h5>
        <div className="col-4 text-center mt-2">
          <button
            className="btn btn-warning"
            onClick={handleSolveWithBacktracking}
          >
            Backtracking
          </button>
        </div>
        <div className="col-4 text-center mt-2">
          <button
            className="btn btn-warning"
            onClick={handleSolveWithLowestDescent}
          >
            Lowest descent
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-start">
        <div className="mt-5">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="d-flex">
              {row.map((cell, colIndex) => (
                <Cell
                  key={colIndex}
                  cell={cell}
                  isLastCell={colIndex === board.length - 1}
                  maxValue={settings.size}
                  onValueChange={value =>
                    handleCellChange(value, rowIndex, colIndex)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center gap-2">
        <SolutionValidator board={board} />
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
