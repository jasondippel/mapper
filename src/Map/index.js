import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps'
import geoData from './data/world-110m.json'

const markers = [
  {
    markerOffset: -30,
    name: 'Vancouver, BC',
    coordinates: [-123.1207, 49.2827], // E(+)/W(-), N(+)/S(-)
  },
]

// Focus points...
// Canada: { rotate: [110, -65, 0], scale: 700 }
export const Map = () => (
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
                  fill: '#D6D6DA',
                  outline: 'none',
                  stroke: '#CCC',
                },
                hover: {
                  fill: '#F53',
                  outline: 'none',
                  stroke: '#CCC',
                },
                pressed: {
                  fill: '#E42',
                  outline: 'none',
                  stroke: '#CCC',
                },
              }}
            />
          ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            fill="none"
            stroke="#000"
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
            y={markerOffset}
            style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ZoomableGroup>
  </ComposableMap>
)
