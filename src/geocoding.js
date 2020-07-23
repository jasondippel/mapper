/**
 * Contains helper functions for leveraging the Geocoding API from GCP
 * https://developers.google.com/maps/documentation/geocoding/overview?hl=en_US
 *
 */

const OUTPUT_FORMAT = 'json'
const GEOCODE_BASE_URL = `https://maps.googleapis.com/maps/api/geocode/${OUTPUT_FORMAT}`
const API_KEY = process.env.REACT_APP_GEOCODING_API_KEY

export const fetchLocationCoordinates = async (rawLocation) => {
  const uriParams = new URLSearchParams()
  uriParams.append('address', rawLocation)
  uriParams.append('key', API_KEY)

  const url = `${GEOCODE_BASE_URL}?${uriParams.toString()}`

  const resp = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })

  const data = await resp.json()

  if (data.results && data.results.length) {
    return data.results[0]
  }

  return
}
