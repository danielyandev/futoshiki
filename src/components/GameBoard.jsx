import { useEffect, useState } from 'react'
import Cell from './Cell.jsx'
import PropTypes from 'prop-types'
import { generateSolvedBoard } from '../helpers/generator.js'
import { getPreparedBoard } from '../helpers/board.js'
import SolutionValidator from './SolutionValidator.jsx'

export default function GameBoard({ settings }) {
  const [board, setBoard] = useState([])
  const [solvedBoard, setSolvedBoard] = useState([])

  useEffect(() => {
    prepareBoard()
  }, [settings])

  const prepareBoard = () => {
    const solvedBoard = generateSolvedBoard(settings)
    setSolvedBoard(solvedBoard)

    const prepared = getPreparedBoard(solvedBoard, settings)

    setBoard(prepared)
  }

  const handleCellChange = (value, row, col) => {
    board[row][col].value = value
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-start">
        <div className="mt-5">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="d-flex">
              {row.map((cell, colIndex) => (
                <Cell
                  key={colIndex}
                  cell={cell}
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

      <div className="d-flex justify-content-center">
        <SolutionValidator solvedBoard={solvedBoard} board={board} />
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
