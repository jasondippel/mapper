import { CANADA, WORLD } from '../../constants'
import geoDataWorld from './world_countries_topo.json'
import geoDataCanada from './canada_provinces_topo.json'

export const CANADA_MAP = {
  name: CANADA,
  geoData: geoDataCanada,
  defaultPosition: {
    coordinates: [-87, 49],
    zoom: 1,
  },
  scale: 700,
}

export const WORLD_MAP = {
  name: WORLD,
  geoData: geoDataWorld,
  defaultPosition: {
    coordinates: [0, -5],
    zoom: 1,
  },
  scale: 200,
}

export const MAPS = {
  [CANADA]: CANADA_MAP,
  [WORLD]: WORLD_MAP,
}
