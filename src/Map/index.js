import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Marker } from './Marker'

const LAND_COLOR = '#00141B'
const LAND_BORDER_COLOR = '#CFD0D0'

const MapRoot = styled.div`
  display: flex;
  position: relative;
`

const MapContainer = styled.div`
  flex: 1;
  max-height: 80vh;
  min-height: 300px;
  overflow: hidden;
  border: 2px solid #000;
  border-radius: 3px;
`

const MapPositionControls = styled.div`
  display: flex;
  flex-direction: column;
`

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    position: 'absolute',
    right: '0',
    bottom: '0',
  },
}))

const Map = ({ mapData = {}, markers = {} }) => {
  const classes = useStyles()

  const [currentPosition, setCurrentPosition] = useState(
    mapData.defaultPosition
  )

  const handleMoveEnd = (position) => {
    setCurrentPosition(position)
  }

  const resetMapPosition = () => {
    setCurrentPosition(mapData.defaultPosition)
  }

  // mimic componentDidUpdate
  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      setCurrentPosition(mapData.defaultPosition)
    } else didMountRef.current = true
  }, [mapData, setCurrentPosition])

  return (
    <MapRoot>
      <MapContainer>
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
            {/* Could render largest markers first, smallest last; Limits chance of markers covering other markers */}
            {Object.keys(markers)
              .sort((a, b) => markers[b].count - markers[a].count)
              .map((key) => {
                const { name, coordinates, count } = markers[key]
                return (
                  <Marker key={name} coordinates={coordinates} size={count} />
                )
              })}
          </ZoomableGroup>
        </ComposableMap>
      </MapContainer>
      <MapPositionControls>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          size="small"
          onClick={resetMapPosition}
        >
          Re-Center Map
        </Button>
      </MapPositionControls>
    </MapRoot>
  )
}

export default Map
