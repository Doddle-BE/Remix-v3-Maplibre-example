import { clientEntry, ref, type Handle, type SerializableProps } from 'remix/ui'

const MAPLIBRE_VERSION = '5.24.0'
const MAPLIBRE_CSS_HREF = `https://esm.sh/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.css`
const MAPLIBRE_JS_URL = `https://esm.sh/maplibre-gl@${MAPLIBRE_VERSION}`

interface MapLibreMapProps extends SerializableProps {
  center: [number, number]
  zoom: number
  styleUrl: string
}

export const MapLibreMap = clientEntry(
  '/assets/app/ui/maplibre-map.tsx#MapLibreMap',
  function MapLibreMap(handle: Handle<MapLibreMapProps>) {
    let initialCenter = `${handle.props.center[1].toFixed(4)}, ${handle.props.center[0].toFixed(4)}`
    let initialZoom = handle.props.zoom.toFixed(1)
    return () => (
      <main
        mix={ref(async (node, signal) => {
          let maplibregl = await import(MAPLIBRE_JS_URL)
          if (signal.aborted) return

          let mapEl = node.querySelector('#map') as HTMLElement
          let centerReadout = node.querySelector('#centerReadout') as HTMLElement
          let zoomReadout = node.querySelector('#zoomReadout') as HTMLElement

          let map = new maplibregl.Map({
            container: mapEl,
            style: handle.props.styleUrl,
            center: handle.props.center,
            zoom: handle.props.zoom,
            attributionControl: { compact: true },
          })
          map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
          map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-right')

          function updateReadout() {
            let c = map.getCenter()
            centerReadout.textContent = `${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}`
            zoomReadout.textContent = map.getZoom().toFixed(1)
          }
          map.on('load', updateReadout)
          map.on('move', updateReadout)
          signal.addEventListener('abort', () => map.remove())
        })}
      >
        <div id="map"></div>
        <div class="map-overlay">
          <span class="dot"></span>
          <span id="centerReadout">{initialCenter}</span>
          <span style="color: var(--line)">·</span>
          <span>
            z
            <span id="zoomReadout" style="color: var(--ink); margin-left: 4px;">
              {initialZoom}
            </span>
          </span>
        </div>
      </main>
    )
  },
)

const MAP_CSS = `
  main {
    position: relative;
    overflow: hidden;
  }

  #map {
    position: absolute;
    inset: 0;
  }

  .map-overlay {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    padding: 8px 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 1px 2px rgba(15,23,42,0.04);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--ink-soft);
    z-index: 1;
  }
  .map-overlay .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 0 3px oklch(0.62 0.09 195 / 0.18);
  }

  .maplibregl-ctrl-group {
    border-radius: var(--radius) !important;
    box-shadow: 0 1px 2px rgba(15,23,42,0.06) !important;
    border: 1px solid var(--line) !important;
  }
  .maplibregl-ctrl-group button {
    width: 30px !important;
    height: 30px !important;
  }
  .maplibregl-ctrl-attrib {
    font-family: 'Inter', sans-serif !important;
    font-size: 10px !important;
    background: rgba(255,255,255,0.85) !important;
  }
`

export const MAP_HEAD = (
  <>
    <link rel="stylesheet" href={MAPLIBRE_CSS_HREF} />
    <style>{MAP_CSS}</style>
  </>
)
