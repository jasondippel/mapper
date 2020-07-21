import React from 'react'
import { Marker as MapsMarker } from 'react-simple-maps'

const MARKER_BORDER_COLOR = '#000000'
const MARKER_FILL_COLOR = '#F28F00'
const MARKER_BORDER_WIDTH = 0.8
const BASE_MARKER_SIZE = 2

export const Marker = ({ name, coordinates }) => (
  <MapsMarker key={name} coordinates={coordinates}>
    <circle
      r={BASE_MARKER_SIZE}
      fill={MARKER_FILL_COLOR}
      stroke={MARKER_BORDER_COLOR}
      strokeWidth={MARKER_BORDER_WIDTH}
    />
  </MapsMarker>
)
