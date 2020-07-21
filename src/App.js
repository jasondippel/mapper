import React from 'react'
import { Map } from './Map'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Mapper</h1>
      <p>
        Display data points on a map and visualize how the data changes over
        time.
      </p>
      <Map />
    </div>
  )
}

export default App
