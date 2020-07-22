import React, { useState } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  slider: {
    width: 300,
  },
  textField: {
    margin: theme.spacing(1),
    width: 248,
  },
  typography: {
    color: '#000',
    width: 300,
  },
}))

const ControlsRoot = styled.section`
  display: flex;
  flex-direction: column;
  background: white;
`

const Row = styled.div`
  display: flex;
`

const CANADA = 'Canada'
const WORLD = 'World'
const YEAR_START = 2010
const YEAR_END = new Date().getFullYear()

const months = [
  { value: 0, label: 'Jan' },
  { value: 1, label: 'Feb' },
  { value: 2, label: 'Mar' },
  { value: 3, label: 'Apr' },
  { value: 4, label: 'May' },
  { value: 5, label: 'Jun' },
  { value: 6, label: 'Jul' },
  { value: 7, label: 'Aug' },
  { value: 8, label: 'Sep' },
  { value: 9, label: 'Oct' },
  { value: 10, label: 'Nov' },
  { value: 11, label: 'Dec' },
]

const years = (() => {
  let y = []
  for (let i = 0; i + YEAR_START <= YEAR_END; i++) {
    y.push({
      value: i,
      label: i + YEAR_START,
    })
  }
  return y
})()

export const MapControls = ({
  addLocation,
  resetMapPosition,
  changeMap,
  mapTypes,
  activeMap,
  activeFilters,
  handleFilterChange,
}) => {
  const classes = useStyles()
  const [location, setLocation] = useState('')
  const [month, setMonth] = useState({ value: '', label: '' })
  const [year, setYear] = useState({ value: '', label: '' })

  const handleLocationUpdate = (event) => setLocation(event.target.value)
  const handleMonthChange = (event) => setMonth(months[event.target.value])
  const handleYearChange = (event) => setYear(years[event.target.value])
  const handleFilterYearChange = (event, value) =>
    handleFilterChange('maxYear')(value)

  const handleAddLocation = () => {
    addLocation({
      location,
      month: month.value,
      year: year.label,
    })

    setLocation('')
    setMonth({ value: '', label: '' })
    setYear({ value: '', label: '' })
  }

  return (
    <ControlsRoot>
      <Row>
        <TextField
          className={`_location-input ${classes.textField}`}
          label="Location"
          value={location}
          onChange={handleLocationUpdate}
        />
        <FormControl className={classes.formControl}>
          <InputLabel>Month</InputLabel>
          <Select value={month.value} onChange={handleMonthChange}>
            {months.map(({ value, label }) => (
              <MenuItem key={`month_select_option_${value}`} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Year</InputLabel>
          <Select value={year.value} onChange={handleYearChange}>
            {years.map(({ value, label }) => (
              <MenuItem key={`year_select_option_${value}`} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={handleAddLocation}
        >
          Mark
        </Button>
      </Row>
      <Row>
        <div className={classes.formControl}>
          <Typography className={classes.typography} gutterBottom>
            Filter By Year
          </Typography>
          <Slider
            className={classes.slider}
            value={activeFilters.maxYear}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={YEAR_START}
            max={YEAR_END}
            onChange={handleFilterYearChange}
          />
        </div>
      </Row>
      <Row>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={resetMapPosition}
        >
          Re-Center Map
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={changeMap}
        >
          Use {activeMap.name === CANADA ? WORLD : CANADA} Map
        </Button>
      </Row>
    </ControlsRoot>
  )
}
