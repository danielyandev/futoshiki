import PropTypes from 'prop-types'
import { useState } from 'react'

export default function SolutionValidator({ solvedBoard, board }) {
  const [checked, setChecked] = useState(false)
  const [valid, setValid] = useState(true)

  const checkSolution = () => {
    const size = solvedBoard.length
    let _valid = true
    for (let row = 0; _valid && row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (solvedBoard[row][col] !== board[row][col].value) {
          _valid = false
          break
        }
      }
    }

    setValid(_valid)
    setChecked(true)
  }

  return (
    <div className="text-center">
      <button className="btn btn-outline-primary" onClick={checkSolution}>
        Check
      </button>
      {checked && (
        <div>
          {valid ? (
            <div className="alert alert-success mt-2">
              Well done! You solved the puzzle.
            </div>
          ) : (
            <div className="alert alert-danger mt-2">
              Solution is not correct, try to update values.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

SolutionValidator.propTypes = {
  solvedBoard: PropTypes.array.isRequired,
  board: PropTypes.array.isRequired
}
