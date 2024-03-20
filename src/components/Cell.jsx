import PropTypes from 'prop-types'

export default function Cell({ cell }) {
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

  return (
    <div>
      <div className="d-flex">
        <div className="border fs-4 border-secondary fw-semibold rounded cell-box d-flex justify-content-center align-items-center">
          {cell.value}
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
  }).isRequired
}
