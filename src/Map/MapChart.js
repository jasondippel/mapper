import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import { Marker } from './Marker'

const LAND_COLOR = '#00141B'
const LAND_BORDER_COLOR = '#CFD0D0'

const NOOP = () => {}

const MapChart = ({
  mapData = {},
  currentPosition = {},
  markers = [],
  handleMoveEnd = NOOP,
}) => (
  <div className="map-container">
    <ComposableMap projectionConfig={{ scale: mapData.scale }}>
      <ZoomableGroup
        zoom={currentPosition.zoom}
        center={currentPosition.coordinates}
        onMoveEnd={handleMoveEnd}
      >
        <Geographies geography={mapData.geoData}>
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
                    strokeWidth: '0.4px',
                  },
                  hover: {
                    fill: LAND_COLOR,
                    outline: 'none',
                    stroke: LAND_BORDER_COLOR,
                    strokeWidth: '1.2px',
                  },
                }}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates} />
        ))}
      </ZoomableGroup>
    </ComposableMap>
  </div>
)

export default MapChart
