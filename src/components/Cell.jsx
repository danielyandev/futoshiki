import PropTypes from 'prop-types'

export default function Cell({ cell }) {
  return (
    <div>
      <div className="d-flex">
        <div className="border fs-4 border-secondary fw-semibold rounded cell-box d-flex justify-content-center align-items-center">
          {cell.value}
        </div>
        <div className="cell-constraint-right d-flex justify-content-center align-items-center">
          {'>'}
        </div>
      </div>
      <div className="cell-constraint-bottom d-flex justify-content-center align-items-center">
        {'<'}
      </div>
    </div>
  )
}

Cell.propTypes = {
  cell: PropTypes.exact({
    value: PropTypes.string,
    constraints: PropTypes.exact({
      right: PropTypes.string,
      bottom: PropTypes.string
    })
  })
}
