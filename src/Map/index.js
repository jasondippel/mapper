import React, { useState } from 'react'
import MapChart from './MapChart'
import { fetchLocationCoordinates } from './geocoding'

import geoDataWorld from './data/world_countries_topo.json'
import geoDataCanada from './data/canada_provinces_topo.json'

const CANADA = 'Canada'
const CANADA_MAP = {
  name: CANADA,
  geoData: geoDataCanada,
  defaultPosition: {
    coordinates: [-87, 49],
    zoom: 1,
  },
  scale: 700,
}
const WORLD = 'World'
const WORLD_MAP = {
  name: WORLD,
  geoData: geoDataWorld,
  defaultPosition: {
    coordinates: [0, -5],
    zoom: 1,
  },
  scale: 200,
}

export const Map = () => {
  const [activeMap, setActiveMap] = useState(CANADA_MAP)
  const [currentPosition, setCurrentPosition] = useState(
    CANADA_MAP.defaultPosition
  )
  const [markers, setMarkers] = useState([])

  const handleMoveEnd = (position) => {
    setCurrentPosition(position)
  }

  const resetMapPosition = () => {
    setCurrentPosition(activeMap.defaultPosition)
  }

  const handleMapChange = () => {
    if (activeMap.name === CANADA) {
      setCurrentPosition(WORLD_MAP.defaultPosition)
      setActiveMap(WORLD_MAP)
    } else {
      setCurrentPosition(CANADA_MAP.defaultPosition)
      setActiveMap(CANADA_MAP)
    }
  }

  const handleAddLocation = async () => {
    const LocationInput = document.querySelector('._location-input')
    const rawLocation = LocationInput.value
    LocationInput.value = ''

    const data = await fetchLocationCoordinates(rawLocation)

    if (data) {
      const newMarkers = [
        ...markers,
        {
          name: rawLocation,
          coordinates: [data.geometry.location.lng, data.geometry.location.lat],
        },
      ]
      setMarkers(newMarkers)
    }
  }

  return (
    <React.Fragment>
      <MapChart
        {...{
          mapData: activeMap,
          currentPosition,
          markers,
          handleMoveEnd,
        }}
      />
      <div className="map-controls">
        <input
          className="_location-input"
          type="text"
          placeholder="Location (ex Vancouver, BC)"
        />
        <button onClick={handleAddLocation}>Add Location Marker</button>
        <button onClick={resetMapPosition}>Recenter Position</button>
        <button onClick={handleMapChange}>
          Use {activeMap.name === CANADA ? WORLD : CANADA} Map
        </button>
      </div>
    </React.Fragment>
  )
}
