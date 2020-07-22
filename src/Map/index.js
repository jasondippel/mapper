import React, { useState, useEffect } from 'react'
import { MapChart } from './MapChart'
import { MapControls } from './MapControls'
import { fetchLocationCoordinates } from './geocoding'
import geoDataWorld from './data/world_countries_topo.json'
import geoDataCanada from './data/canada_provinces_topo.json'

const YEAR_END = new Date().getFullYear()

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

const filterAndFormatMarkers = (allMarkers, activeFilters) => {
  let visibleMarkers = {}

  const addToVisibleMarkers = (marker) => {
    if (!!visibleMarkers[marker.name]) {
      visibleMarkers[marker.name].count++
    } else {
      visibleMarkers[marker.name] = {
        ...marker,
        count: 1,
      }
    }
  }

  allMarkers.forEach(({ name, country, date, coordinates }) => {
    if (activeFilters.location !== WORLD && activeFilters.location !== country)
      return

    if (date.year === '') {
      addToVisibleMarkers({ name, date, coordinates })
    } else if (date.year <= activeFilters.maxYear) {
      if (date.month === '' || date.month <= activeFilters.maxMonth) {
        addToVisibleMarkers({ name, date, coordinates })
      }
    }
  })

  return visibleMarkers
}

export const Map = () => {
  const [activeMap, setActiveMap] = useState(CANADA_MAP)
  const [currentPosition, setCurrentPosition] = useState(
    CANADA_MAP.defaultPosition
  )
  const [visibleMarkers, setVisibleMarkers] = useState({})
  const [markers, setMarkers] = useState([])
  const [activeFilters, setActiveFilters] = useState({
    location: CANADA,
    maxYear: YEAR_END,
    maxMonth: undefined,
  })

  useEffect(() => {
    setVisibleMarkers(filterAndFormatMarkers(markers, activeFilters))
  }, [markers, activeFilters])

  const handleMoveEnd = (position) => {
    setCurrentPosition(position)
  }

  const resetMapPosition = () => {
    setCurrentPosition(activeMap.defaultPosition)
  }

  const changeMap = () => {
    if (activeMap.name === CANADA) {
      setCurrentPosition(WORLD_MAP.defaultPosition)
      setActiveMap(WORLD_MAP)
      setActiveFilters({
        ...activeFilters,
        location: WORLD,
      })
    } else {
      setCurrentPosition(CANADA_MAP.defaultPosition)
      setActiveMap(CANADA_MAP)
      setActiveFilters({
        ...activeFilters,
        location: CANADA,
      })
    }
  }

  const addLocation = async ({ location, month, year }) => {
    if (!location) return

    const data = await fetchLocationCoordinates(location)
    console.log('data', data)

    if (data) {
      const country =
        data.address_components[data.address_components.length - 1].long_name
      setMarkers([
        ...markers,
        {
          name: data.formatted_address,
          country,
          date: {
            month,
            year,
          },
          coordinates: [data.geometry.location.lng, data.geometry.location.lat],
        },
      ])
    }
  }

  const handleFilterChange = (field) => (newValue) => {
    if (activeFilters[field] === newValue) return
    setActiveFilters({
      ...activeFilters,
      [field]: newValue,
    })
  }

  console.log('render', markers, visibleMarkers, activeFilters)

  return (
    <React.Fragment>
      <MapChart
        {...{
          mapData: activeMap,
          currentPosition,
          markers: visibleMarkers,
          handleMoveEnd,
        }}
      />
      <MapControls
        {...{
          activeMap,
          activeFilters,
          addLocation,
          resetMapPosition,
          changeMap,
          handleFilterChange, // TODO handle Filter by Year/Month
        }}
      />
    </React.Fragment>
  )
}
