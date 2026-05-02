import type { BuildAction } from 'remix/fetch-router'

import type { routes } from '../routes.ts'
import { Layout } from '../ui/layout.tsx'
import { MAP_HEAD, MapLibreMap } from '../ui/maplibre-map.tsx'
import { render } from '../utils/render.tsx'

export const map: BuildAction<'GET', typeof routes.home> = {
  handler({ request }) {
    return render(<MapPage />, request)
  },
}

function MapPage() {
  return () => (
    <Layout title="Atlas — Map" head={MAP_HEAD}>
      <MapLibreMap
        center={[4.3517, 50.8503]}
        zoom={11}
        styleUrl="https://tiles.openfreemap.org/styles/liberty"
      />
    </Layout>
  )
}
