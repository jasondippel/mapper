import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import geoData from './data/world-110m.json'

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
                },
                hover: {
                  fill: '#F53',
                  outline: 'none',
                },
                pressed: {
                  fill: '#E42',
                  outline: 'none',
                },
              }}
            />
          ))
        }
      </Geographies>
    </ZoomableGroup>
  </ComposableMap>
)
