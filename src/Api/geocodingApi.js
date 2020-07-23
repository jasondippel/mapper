/**
 * Contains helper functions for leveraging the Geocoding API from GCP
 * https://developers.google.com/maps/documentation/geocoding/overview?hl=en_US
 *
 */

const OUTPUT_FORMAT = 'json'
const GEOCODE_BASE_URL = `https://maps.googleapis.com/maps/api/geocode/${OUTPUT_FORMAT}`

class geocodingApi {
  _apiKey = undefined

  setApiKey(keyVal) {
    this._apiKey = keyVal
  }

  async fetchLocationCoordinates(rawLocation) {
    if (this._apiKey === undefined) {
      this._handleError(
        'Must define api key before you can get location details'
      )
      return
    }

    const uriParams = new URLSearchParams()
    uriParams.append('address', rawLocation)
    uriParams.append('key', this._apiKey)

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

  _handleError(msg) {
    // TODO: make this a little nicer
    alert(msg)
  }
}

const instance = new geocodingApi()

export default instance
