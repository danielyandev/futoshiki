import PropTypes from 'prop-types'
import { useState } from 'react'
import { checkSolution } from '../helpers/board.js'

export default function SolutionValidator({ solvedBoard, board }) {
  const [checked, setChecked] = useState(false)
  const [valid, setValid] = useState(true)

  const handleCheckSolution = () => {
    setValid(checkSolution(solvedBoard, board))
    setChecked(true)
  }

  return (
    <div className="text-center">
      <button className="btn btn-outline-primary" onClick={handleCheckSolution}>
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
