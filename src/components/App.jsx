import GameBoard from './GameBoard.jsx'
import Settings from './Settings.jsx'
import Info from './Info.jsx'
import { useState } from 'react'

export default function App() {
  const [settings, setSettings] = useState({
    size: '4',
    level: '1'
  })

  const handleSettingsChange = (size, level) => {
    setSettings({ size, level })
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Futoshiki Game</h1>
      <div className="row">
        <div className="col-md-8">
          <GameBoard settings={settings} />
        </div>
        <div className="col-md-4">
          <Settings
            settings={settings}
            onSettingsChange={handleSettingsChange}
          />
          <hr />
          <Info />
        </div>
      </div>
    </div>
  )
}
