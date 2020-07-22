import React from 'react'
import { Marker as MapsMarker } from 'react-simple-maps'

const MARKER_BORDER_COLOR = '#000000'
const MARKER_FILL_COLOR = '#F28F00'
const MARKER_BORDER_WIDTH = 1.2
const BASE_MARKER_SIZE = 4

export const Marker = ({ coordinates, size }) => (
  <MapsMarker coordinates={coordinates}>
    <circle
      r={BASE_MARKER_SIZE + size}
      fill={MARKER_FILL_COLOR}
      stroke={MARKER_BORDER_COLOR}
      strokeWidth={MARKER_BORDER_WIDTH}
    />
  </MapsMarker>
)
