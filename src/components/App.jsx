import GameBoard from './GameBoard.jsx'
import Settings from './Settings.jsx'
import Info from './Info.jsx'

export default function App() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Futoshiki Game</h1>
      <div className="row">
        <div className="col-md-8">
          <GameBoard />
        </div>
        <div className="col-md-4">
          <Settings />
          <hr />
          <Info />
        </div>
      </div>
    </div>
  )
}
