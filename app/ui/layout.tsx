import type { RemixNode } from 'remix/ui'

import { Document } from './document.tsx'

export interface LayoutProps {
  children?: RemixNode
  title?: string
  head?: RemixNode
}

export function Layout() {
  return ({ title, children, head }: LayoutProps) => (
    <Document
      title={title}
      head={
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          />
          <style>{ATLAS_CSS}</style>
          {head}
        </>
      }
    >
      <header>
        <div class="brand">
          <div class="brand-mark"></div>
          <div class="brand-name">Atlas</div>
          <div class="brand-divider"></div>
          <div class="brand-sub">map / v0.1</div>
        </div>
        <nav>
          {/* future navigation buttons */}
        </nav>
      </header>

      {children}

      <footer>
        <div class="footer-left">
          <div class="footer-item">
            <span class="status-dot"></span>
            <span class="value">Ready</span>
          </div>
          <div class="footer-item">
            <span class="label">tiles</span>
            <span class="value">openfreemap / liberty</span>
          </div>
        </div>
        <div class="footer-right">
          <div class="footer-item">
            <span class="label">©</span>
            <span class="value">Atlas 2026</span>
          </div>
        </div>
      </footer>
    </Document>
  )
}

const ATLAS_CSS = `
  :root {
    --bg: oklch(0.985 0.005 240);
    --surface: oklch(1 0 0);
    --ink: oklch(0.22 0.02 250);
    --ink-soft: oklch(0.46 0.015 250);
    --line: oklch(0.92 0.008 240);
    --accent: oklch(0.62 0.09 195);
    --accent-soft: oklch(0.95 0.03 195);
    --radius: 6px;
  }

  * { box-sizing: border-box; }

  html, body {
    margin: 0;
    height: 100%;
    background: var(--bg);
    color: var(--ink);
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  body {
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100vh;
  }

  /* ---------- Header ---------- */
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 18px;
    background: var(--surface);
    border-bottom: 1px solid var(--line);
    height: 48px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .brand-mark {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background: var(--ink);
    position: relative;
    display: grid;
    place-items: center;
  }
  .brand-mark::after {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }

  .brand-name {
    font-weight: 600;
    letter-spacing: -0.01em;
    font-size: 14px;
  }

  .brand-divider {
    width: 1px;
    height: 14px;
    background: var(--line);
    margin: 0 4px;
  }

  .brand-sub {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--ink-soft);
    letter-spacing: 0.02em;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  nav button {
    border: 0;
    background: transparent;
    font: inherit;
    color: var(--ink-soft);
    padding: 6px 10px;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 13px;
    transition: background 0.12s, color 0.12s;
  }
  nav button:hover {
    background: var(--bg);
    color: var(--ink);
  }
  nav button.is-active {
    background: var(--accent-soft);
    color: var(--ink);
  }

  /* ---------- Footer ---------- */
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 18px;
    background: var(--surface);
    border-top: 1px solid var(--line);
    height: 32px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--ink-soft);
    letter-spacing: 0.01em;
  }

  .footer-left, .footer-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .footer-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .footer-item .label {
    color: oklch(0.62 0.012 250);
  }

  .footer-item .value {
    color: var(--ink);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
`
