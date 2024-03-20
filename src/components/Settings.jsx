export default function Settings() {
  return (
    <div>
      <h4>Settings</h4>
      <div className="d-flex gap-3">
        <select className="form-control form-select">
          <option value="">Board size</option>
          <option value="4">4x4</option>
          <option value="5">5x5</option>
          <option value="6">6x6</option>
          <option value="7">7x7</option>
          <option value="8">8x8</option>
          <option value="9">9x9</option>
        </select>

        <select className="form-control form-select">
          <option value="">Difficulty</option>
          <option value="1">Easy</option>
          <option value="2">Normal</option>
          <option value="3">Hard</option>
        </select>
      </div>
      <div className="d-grid col-6 mx-auto mt-2">
        <button className="btn btn-outline-success">Generate</button>
      </div>
    </div>
  )
}
