import PropTypes from 'prop-types'

export default function Cell({ cell, maxValue, onValueChange }) {
  const renderRightConstraint = () => {
    if (!cell.constraints.right) return null

    const side = cell.constraints.right === '>' ? 'right' : 'left'
    return <i className={`fa fa-chevron-${side}`} />
  }

  const renderBottomConstraint = () => {
    if (!cell.constraints.bottom) return null

    const side = cell.constraints.bottom === '>' ? 'down' : 'up'
    return <i className={`fa fa-chevron-${side}`} />
  }

  const handleValueChange = e => {
    let val = e.target.value
    const notAllowedSigns = [' ', '0']
    if (
      notAllowedSigns.includes(val) ||
      isNaN(val) ||
      parseInt(val) > parseInt(maxValue)
    ) {
      val = ''
    }

    onValueChange(parseInt(val))
  }

  return (
    <div>
      <div className="d-flex">
        <div className="border fs-4 border-secondary fw-semibold rounded cell-box d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="w-100 text-center border-0"
            value={cell.value}
            onChange={handleValueChange}
          />
        </div>
        <div className="cell-constraint-right d-flex justify-content-center align-items-center">
          {renderRightConstraint()}
        </div>
      </div>
      <div className="cell-constraint-bottom d-flex justify-content-center align-items-center">
        {renderBottomConstraint()}
      </div>
    </div>
  )
}

const constraints = ['>', '<', '']

Cell.propTypes = {
  cell: PropTypes.exact({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    constraints: PropTypes.exact({
      right: PropTypes.oneOf(constraints),
      bottom: PropTypes.oneOf(constraints)
    })
  }).isRequired,
  maxValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onValueChange: PropTypes.func.isRequired
}
