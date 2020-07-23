// LOCATIONS
export const WORLD = 'World'
export const CANADA = 'Canada'

// DATES
export const YEAR_END = new Date().getFullYear()
export const YEAR_START = 2010
export const MONTHS = [
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
export const YEARS = (() => {
  let y = []
  for (let i = 0; i + YEAR_START <= YEAR_END; i++) {
    y.push({
      value: i,
      label: i + YEAR_START,
    })
  }
  return y
})()
