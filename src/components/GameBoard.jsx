import { useCallback, useEffect, useState } from 'react'
import Cell from './Cell.jsx'
import PropTypes from 'prop-types'
import { generateSolvedBoard } from '../helpers/generator.js'
import { deepCopy, getPreparedBoard } from '../helpers/board.js'
import SolutionValidator from './SolutionValidator.jsx'
import { solveWithBacktracking } from '../solvers/backtracking.js'
import { solveWithHillClimbing } from '../solvers/hillclimbing.js'
import { solveWithCSP } from '../solvers/csp.js'
import { solveWithGeneticAlgorithm } from '../solvers/genetic.js'
import printStats from '../helpers/stats.js'

export default function GameBoard({ settings }) {
  const [board, setBoard] = useState([])

  /**
   * Generate a solved board and try to adjust constraints
   * so that the solution is unique.
   * If adjusting constraints does not help, regenerate a solved board
   * and repeat everything again
   */
  const prepareBoard = useCallback(() => {
    const solvedBoard = generateSolvedBoard(settings)
    const prepared = getPreparedBoard(solvedBoard, settings)

    setBoard(prepared)
  }, [settings])

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
    const boardCopy = deepCopy(board)
    const { stats } = solveWithBacktracking(boardCopy)
    printStats(stats)
    setBoard(boardCopy)
  }

  const handleSolveWithHillClimbing = () => {
    const { board: solved, stats } = solveWithHillClimbing(board)
    printStats(stats)
    setBoard(solved)
  }

  const handleSolveWithCSP = () => {
    const boardCopy = deepCopy(board)
    const { board: solved, stats } = solveWithCSP(boardCopy)
    printStats(stats)
    setBoard(solved)
  }

  const handleSolveWithGeneticAlgorithm = () => {
    const solved = solveWithGeneticAlgorithm(board)
    setBoard(solved)
  }

  useEffect(() => {
    prepareBoard()
  }, [prepareBoard])

  return (
    <div>
      <div className="row">
        <h5 className="text-center">Choose an algorithm to solve</h5>
        <div className="col-3 text-center mt-2">
          <button
            className="btn btn-warning"
            onClick={handleSolveWithBacktracking}
          >
            Backtracking
          </button>
        </div>
        <div className="col-3 text-center mt-2">
          <button
            className="btn btn-warning"
            onClick={handleSolveWithHillClimbing}
          >
            Hill climbing
          </button>
        </div>
        <div className="col-3 text-center mt-2">
          <button className="btn btn-warning" onClick={handleSolveWithCSP}>
            CSP
          </button>
        </div>
        <div className="col-3 text-center mt-2">
          <button
            className="btn btn-warning"
            onClick={handleSolveWithGeneticAlgorithm}
          >
            Genetic algorithm
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
