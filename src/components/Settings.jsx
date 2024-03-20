import { useState } from 'react'
import PropTypes from 'prop-types'

export default function Settings({ settings, onSettingsChange }) {
  const [size, setSize] = useState(settings.size)
  const [level, setLevel] = useState(settings.level)
  const handleGenerate = () => {
    onSettingsChange(size, level)
  }

  return (
    <div>
      <h4>Settings</h4>
      <div className="d-flex gap-3">
        <select
          className="form-control form-select"
          onChange={e => setSize(e.target.value)}
          defaultValue={size}
        >
          <option value="4">4x4</option>
          <option value="5">5x5</option>
          <option value="6">6x6</option>
          <option value="7">7x7</option>
          <option value="8">8x8</option>
          <option value="9">9x9</option>
        </select>

        <select
          className="form-control form-select"
          onChange={e => setLevel(e.target.value)}
          defaultValue={level}
        >
          <option value="1">Easy</option>
          <option value="2">Normal</option>
          <option value="3">Hard</option>
        </select>
      </div>
      <div className="d-grid col-6 mx-auto mt-2">
        <button className="btn btn-outline-success" onClick={handleGenerate}>
          Generate
        </button>
      </div>
    </div>
  )
}

Settings.propTypes = {
  settings: PropTypes.exact({
    size: PropTypes.string,
    level: PropTypes.string
  }).isRequired,
  onSettingsChange: PropTypes.func.isRequired
}
