import type { BuildAction } from 'remix/fetch-router'

import { createRequire } from 'node:module'

import { assets } from '../assets.ts'
import type { routes } from '../routes.ts'
import { Layout } from '../ui/layout.tsx'
import { mapHead, MapLibreMap } from '../ui/maplibre-map.tsx'
import { render } from '../utils/render.tsx'

const require = createRequire(import.meta.url)
const MAPLIBRE_VERSION = require('maplibre-gl/package.json').version as string
const MAPLIBRE_CSS_HREF = await assets.getHref('node_modules/maplibre-gl/dist/maplibre-gl.css')
const MAPLIBRE_MODULE_URL = `https://esm.sh/maplibre-gl@${MAPLIBRE_VERSION}`

export const map: BuildAction<'GET', typeof routes.home> = {
  handler({ request }) {
    return render(<MapPage />, request)
  },
}

function MapPage() {
  return () => (
    <Layout title="Atlas — Map" head={mapHead(MAPLIBRE_CSS_HREF, MAPLIBRE_MODULE_URL)}>
      <MapLibreMap
        center={[4.3517, 50.8503]}
        zoom={11}
        styleUrl="https://tiles.openfreemap.org/styles/liberty"
      />
    </Layout>
  )
}
