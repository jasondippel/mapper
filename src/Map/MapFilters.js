import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

import { YEAR_START, YEAR_END } from '../constants'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    minWidth: 120,
  },
  sectionHeading: {
    marginBottom: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  slider: {
    color: theme.palette.primary.main,
    boxSize: 'border-box',
    marginBottom: 0,
    paddingBottom: 0,
  },
  textField: {
    margin: theme.spacing(1),
  },
  filterTitle: {
    color: theme.palette.text.secondary,
  },
}))

const MapFilters = ({
  filterValues,
  mapOptions,
  setMaxYearFilter,
  setActiveMapFilter,
}) => {
  const classes = useStyles()
  const handleFilterYearChange = (event, value) => setMaxYearFilter(value)
  const handleFilterMapChange = (event) =>
    setActiveMapFilter(event.target.value)

  return (
    <React.Fragment>
      <Typography variant="h6" className={classes.sectionHeading}>
        Filters & Options
      </Typography>
      <FormControl className={classes.formControl}>
        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.filterTitle}
        >
          Active Map
        </Typography>
        <Select value={filterValues.activeMap} onChange={handleFilterMapChange}>
          {mapOptions.map((value) => (
            <MenuItem key={`map_select_option_${value}`} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={classes.formControl}>
        <Typography
          variant="subtitle2"
          gutterBottom
          className={classes.filterTitle}
        >
          Filter By Year
        </Typography>
        <Slider
          className={classes.slider}
          value={filterValues.maxYear}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={YEAR_START}
          max={YEAR_END}
          onChange={handleFilterYearChange}
        />
      </div>
    </React.Fragment>
  )
}

export default MapFilters
