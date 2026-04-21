"use client"

import { ReactNode } from "react"

interface ArchLayoutProps {
  children: ReactNode
  onBack?: () => void
  onHome?: () => void
  title?: string
}

export function ArchLayout({ children, onBack, onHome, title }: ArchLayoutProps) {
  return (
    <div className="h-full relative overflow-hidden" style={{ background: '#678F74' }}>
      {/* Arch background SVG */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svgs/arch-bg.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
      />

      {/* Back corner tile (top-left) */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-0 left-0 z-30"
          style={{ width: '22%', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          aria-label="Go back"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svgs/corner-back.svg" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </button>
      )}

      {/* Home corner tile (top-right, mirrored) */}
      {onHome && (
        <button
          onClick={onHome}
          className="absolute top-0 right-0 z-30"
          style={{ width: '22%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', transform: 'scaleX(-1)' }}
          aria-label="Go home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svgs/corner-back.svg" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </button>
      )}

      {/* Screen title in arch area */}
      {title && (
        <div
          className="absolute left-0 right-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ top: 0, height: '15%' }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              color: '#EDE2C2',
              letterSpacing: '0.04em',
              fontWeight: 500,
            }}
          >
            {title}
          </h1>
        </div>
      )}

      {/* Content — starts below the arch curve (~29% of height from top) */}
      {/* padding-top: 48.2% of width = 29% of height at 45:75 aspect ratio */}
      <div
        className="absolute inset-0 z-10 flex flex-col"
        style={{ paddingTop: '48.2%' }}
      >
        <div className="flex-1 min-h-0 flex flex-col overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
