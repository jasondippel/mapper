import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { YEARS, MONTHS } from './constants'

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    minWidth: 100,
  },
  sectionHeading: {
    marginBottom: theme.spacing(1),
  },
  row: {
    display: 'flex',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  filterTitle: {
    color: theme.palette.text.secondary,
  },
}))

const DataEntry = ({ addLocation }) => {
  const classes = useStyles()

  const [location, setLocation] = useState('')
  const [month, setMonth] = useState({ value: '', label: '' })
  const [year, setYear] = useState({ value: '', label: '' })

  const handleLocationUpdate = (event) => setLocation(event.target.value)
  const handleMonthChange = (event) => setMonth(MONTHS[event.target.value])
  const handleYearChange = (event) => setYear(YEARS[event.target.value])

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
    <React.Fragment>
      <Typography variant="h6" className={classes.sectionHeading}>
        Add Data Points{' '}
      </Typography>
      <div className={classes.Row}>
        <TextField
          className={`_location-input ${classes.textField}`}
          label="Location"
          value={location}
          onChange={handleLocationUpdate}
        />
      </div>
      <div className={classes.Row}>
        <FormControl className={classes.formControl}>
          <InputLabel>Month</InputLabel>
          <Select value={month.value} onChange={handleMonthChange}>
            {MONTHS.map(({ value, label }) => (
              <MenuItem key={`month_select_option_${value}`} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Year</InputLabel>
          <Select value={year.value} onChange={handleYearChange}>
            {YEARS.map(({ value, label }) => (
              <MenuItem key={`year_select_option_${value}`} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.Row}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleAddLocation}
        >
          Add Mark
        </Button>
        <Button className={classes.button} size="small" color="primary">
          Upload .csv
        </Button>
      </div>
    </React.Fragment>
  )
}

export default DataEntry
