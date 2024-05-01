import { useState } from 'react'
import PropTypes from 'prop-types'
import { sizes, levels } from '../constants.js'

export default function Settings({ settings, onSettingsChange }) {
  const [size, setSize] = useState(settings.size)
  const [level, setLevel] = useState(settings.level)
  const handleGenerate = () => {
    onSettingsChange(size, level)
  }

  return (
    <div>
      <h5>Settings</h5>
      <div className="d-flex gap-3">
        <select
          className="form-control form-select"
          onChange={e => setSize(e.target.value)}
          defaultValue={size}
        >
          {sizes.map(size => (
            <option key={size} value={size}>{`${size}x${size}`}</option>
          ))}
        </select>

        <select
          className="form-control form-select"
          onChange={e => setLevel(e.target.value)}
          defaultValue={level}
        >
          {Object.entries(levels).map(([level, levelName]) => (
            <option key={level} value={level}>
              {levelName}
            </option>
          ))}
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
