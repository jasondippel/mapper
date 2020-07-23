import React, { useState, useEffect } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import Map from './Map'
import MapFilters from './Map/MapFilters'
import DataEntry from './DataEntry'
import DataTable from './DataTable'
import { fetchLocationCoordinates } from './geocoding'
import theme from './theme'
import { WORLD, YEAR_END } from './constants'
import { MAPS } from './Map/data'

const DRAWER_WIDTH = 300
const DEFAULT_MAP = WORLD

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.grey[900],
  },
  drawerContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  drawerSection: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(7),
  },
}))

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const filterAndFormatMarkers = (allMarkers, activeFilters) => {
  let visibleMarkers = {}

  const addToVisibleMarkers = (marker) => {
    if (!!visibleMarkers[marker.name]) {
      visibleMarkers[marker.name].count++
    } else {
      visibleMarkers[marker.name] = {
        name: marker.name,
        country: marker.country,
        coordinates: marker.coordinates,
        count: 1,
      }
    }
  }

  allMarkers.forEach(({ name, country, date, coordinates }) => {
    if (
      activeFilters.activeMap !== WORLD &&
      activeFilters.activeMap !== country
    )
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

export const App = () => {
  const classes = useStyles()

  const [activeMapData, setActiveMapData] = useState(MAPS[DEFAULT_MAP])
  const [activeFilters, setActiveFilters] = useState({
    activeMap: DEFAULT_MAP,
    maxYear: YEAR_END,
    maxMonth: 11,
  })
  const [markers, setMarkers] = useState([])
  const [visibleMarkers, setVisibleMarkers] = useState({})

  useEffect(() => {
    setVisibleMarkers(filterAndFormatMarkers(markers, activeFilters))
  }, [markers, activeFilters])

  const handleFilterChange = (field) => (newValue) => {
    if (activeFilters[field] === newValue) return

    // Changing the map is a bit of a special case as multiple things need to change
    if (field === 'activeMap') {
      const newMapData = MAPS[newValue]
      setActiveFilters({
        ...activeFilters,
        [field]: newMapData.name,
      })
      setActiveMapData(newMapData)
    }

    setActiveFilters({
      ...activeFilters,
      [field]: newValue,
    })
  }

  const addLocation = async ({ location, month, year }) => {
    if (!location) return

    const data = await fetchLocationCoordinates(location)
    if (!!data) {
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

  const bulkAddLocations = async (locations) => {
    // TODO: this should be done better, but I'm too tired to figure it out right now...
    const formattedLocations = []
    await asyncForEach(locations, async ({ location, month, year }) => {
      const data = await fetchLocationCoordinates(location)
      if (!!data) {
        const country =
          data.address_components[data.address_components.length - 1].long_name
        formattedLocations.push({
          name: data.formatted_address,
          country,
          date: {
            month,
            year,
          },
          coordinates: [data.geometry.location.lng, data.geometry.location.lat],
        })
      }
    })

    setMarkers([...markers, ...formattedLocations])
  }

  const clearAllLocations = () => setMarkers([])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h5" noWrap>
              Mapper
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          overflow="hidden"
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <div className={classes.drawerSection}>
              <Typography>
                Display data points on a map and visualize how the data changes
                over time.
              </Typography>
            </div>
            <Divider />
            <div className={classes.drawerSection}>
              <MapFilters
                {...{
                  filterValues: activeFilters,
                  mapOptions: Object.keys(MAPS),
                  setMaxYearFilter: handleFilterChange('maxYear'),
                  setActiveMapFilter: handleFilterChange('activeMap'),
                }}
              />
            </div>
            <Divider />
            <div className={classes.drawerSection}>
              <DataEntry
                {...{ addLocation, bulkAddLocations, clearAllLocations }}
              />
            </div>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Map {...{ mapData: activeMapData, markers: visibleMarkers }} />
          <DataTable rawData={markers} />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
