import React, { useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps'
import { fetchLocationCoordinates } from './geocoding'
import geoData from './data/world_countries_topo.json'
// import geoData from './data/canada_provinces_topo.json'

const MARKER_OFFSET = -30
const LAND_COLOR = '#00141B'
const LAND_BORDER_COLOR = '#696969'
const LAND_HOVER_COLOR = '#00C9A5'
const MARKER_COLOR = '#F1EEE4'

const generateMarker = async (rawLocation, markers, setMarkers) => {
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

export const Map = () => {
  const [markers, setMarkers] = useState([])

  const handleAddLocation = () => {
    const LocationInput = document.querySelector('._location-input')
    const providedLocation = LocationInput.value
    LocationInput.value = ''

    generateMarker(providedLocation, markers, setMarkers)
  }

  // World: { scale: 200 }
  // Canada: { scale: 700, rotate: [100, -63.5, 0] }
  return (
    <React.Fragment>
      <div className="map-container">
        <ComposableMap projectionConfig={{ scale: 200 }}>
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoData}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: LAND_COLOR,
                        outline: 'none',
                        stroke: LAND_BORDER_COLOR,
                      },
                      hover: {
                        fill: LAND_HOVER_COLOR,
                        outline: 'none',
                        stroke: LAND_BORDER_COLOR,
                      },
                    }}
                  />
                ))
              }
            </Geographies>
            {markers.map(({ name, coordinates }) => (
              <Marker key={name} coordinates={coordinates}>
                <g
                  fill="none"
                  stroke={MARKER_COLOR}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(-12, -24)"
                >
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                </g>
                <text
                  textAnchor="middle"
                  y={MARKER_OFFSET}
                  style={{ fontFamily: 'system-ui', fill: MARKER_COLOR }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <input
        className="_location-input"
        type="text"
        placeholder="Location (ex Vancouver, BC)"
      />
      <button onClick={handleAddLocation}>Add Location Marker</button>
    </React.Fragment>
  )
}
