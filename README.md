# Remix V3 + MapLibre Example

A small demo app built on the **current beta** of [Remix v3](https://remix.run/) showing how to render an interactive map with [MapLibre GL JS](https://maplibre.org/).

The map uses [OpenFreeMap](https://openfreemap.org/) tiles (the OpenMapTiles schema served free over OpenStreetMap data) with the *Liberty* style, and is wrapped in a small "Atlas" UI shell — a header, a footer with status info, and a live coordinate / zoom readout overlay.

<img src="docs/screenshot.png" alt="Atlas map showing Brussels with header, footer and coordinate readout overlay" width="700">

## What's in here

- `app/controllers/map.tsx` — the route handler for `/`, just composes `<Layout>` + `<MapLibreMap>`.
- `app/ui/layout.tsx` — generic page chrome (header, footer, fonts, design tokens) shared by any future route.
- `app/ui/maplibre-map.tsx` — the MapLibre client component (loads `maplibre-gl` on the client via `clientEntry` + `ref`) plus its own `MAP_HEAD` styles.
- `app/routes.ts` — the route contract.
- `app/router.ts` — wires routes to handlers.
- `app/utils/render.tsx` — HTML response rendering helper.

## Commands

```sh
pnpm install
pnpm start         # boot the server
pnpm test
pnpm typecheck
```

Then open <http://localhost:44100/>.

## Notes

- Remix v3 is still in beta; APIs may change.
- MapLibre GL JS is loaded directly from `esm.sh` at runtime — no bundler step required.
- Map style: `https://tiles.openfreemap.org/styles/liberty`. Attribution is added automatically by MapLibre.
