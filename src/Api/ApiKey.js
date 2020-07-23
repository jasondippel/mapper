import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import geocodingApi from './geocodingApi'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    minWidth: 100,
  },
  h6: {
    margin: theme.spacing(2, 0),
  },
  link: {
    color: theme.palette.primary.light,
  },
  row: {
    display: 'flex',
  },
  textField: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}))

const ApiKey = () => {
  const classes = useStyles()

  const [apiKeyInput, setApiKeyInput] = useState('')
  const handleApiKeyUpdate = (event) => {
    setApiKeyInput(event.target.value)
    geocodingApi.setApiKey(event.target.value)
  }
  const preventDefault = (e) => e.preventDefault()

  return (
    <React.Fragment>
      <Typography variant="h6" className={classes.h6}>
        Geocoding API Key
      </Typography>
      <Typography variant="paragraph">
        Mapper leverages the{' '}
        <Link
          className={classes.link}
          href="https://developers.google.com/maps/documentation/geocoding/start"
          rel="noreferrer noopener"
          onClick={preventDefault}
        >
          Geocoding API
        </Link>{' '}
        from Google to get location information. In order for this to work, we
        require you to input an API key for that API. If you don't have an API
        key, learn{' '}
        <Link
          className={classes.link}
          href="https://developers.google.com/maps/documentation/geocoding/get-api-key"
          rel="noreferrer noopener"
          onClick={preventDefault}
        >
          how to get an api key
        </Link>
        .
      </Typography>
      <div className={classes.Row}>
        <TextField
          className={`_api-key-input ${classes.textField}`}
          label="Your API Key"
          value={apiKeyInput}
          onChange={handleApiKeyUpdate}
        />
      </div>
    </React.Fragment>
  )
}

export default ApiKey
