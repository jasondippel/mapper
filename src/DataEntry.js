import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Modal from '@material-ui/core/Modal'
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
  buttonBottom: {
    width: '100%',
    margin: theme.spacing(1, 0),
  },
  formControl: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    minWidth: 100,
  },
  h4: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.grey[900],
    border: 'none',
    padding: theme.spacing(2, 4, 3),
  },
  row: {
    display: 'flex',
  },
  rowBottomCentered: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  sectionHeading: {
    marginBottom: theme.spacing(1),
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
  fileInput: {
    marginTop: theme.spacing(2),
  },
}))

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const DataEntry = ({ addLocation, bulkAddLocations, clearAllLocations }) => {
  const classes = useStyles()

  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  const [location, setLocation] = useState('')
  const [month, setMonth] = useState({ value: '', label: '' })
  const [year, setYear] = useState({ value: '', label: '' })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleLocationUpdate = (event) => setLocation(event.target.value)
  const handleMonthChange = (event) => setMonth(MONTHS[event.target.value])
  const handleYearChange = (event) => setYear(YEARS[event.target.value])
  const handleClearAllLocations = () => clearAllLocations()

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

  const handleFileUpload = (selectFileEvent) => {
    const file = selectFileEvent.target.files[0]
    const reader = new FileReader()

    reader.onload = (fileLoadedEvent) => {
      var result = JSON.parse(fileLoadedEvent.target.result)

      if (!result.data || !Array.isArray(result.data))
        return notifyBadFileUpload()

      bulkAddLocations(result.data)
    }

    reader.readAsText(file)
    handleClose()
  }

  const notifyBadFileUpload = () =>
    alert('File upload failed. Please ensure data is formatted correctly.')

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <Typography variant="h4" className={classes.h4}>
        File Upload
      </Typography>
      <Typography variant="paragraph">Select a .json file to upload</Typography>
      <div className={classes.Row}>
        <input
          className={classes.fileInput}
          type="file"
          accept="application/json"
          onChange={handleFileUpload}
        />
      </div>
    </div>
  )

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
        <Button className={classes.button} size="small" onClick={handleOpen}>
          Upload .json
        </Button>
      </div>
      <div className={classes.rowBottomCentered}>
        <Button
          className={classes.buttonBottom}
          variant="outlined"
          color="secondary"
          onClick={handleClearAllLocations}
        >
          Clear All Data
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </React.Fragment>
  )
}

export default DataEntry
