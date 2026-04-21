"use client"

import { ReactNode } from "react"

interface OvalLayoutProps {
  children: ReactNode
  onBack?: () => void
  onHome?: () => void
}

export function OvalLayout({ children, onBack, onHome }: OvalLayoutProps) {
  return (
    <div className="h-full relative overflow-hidden" style={{ background: '#EDE2C2' }}>
      {/* Oval border SVG — fills the entire frame */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svgs/oval-border.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
      />

      {/* Leaf logo at top center */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none" style={{ top: '6%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/svgs/leaf-logo.svg" alt="" aria-hidden="true" style={{ width: '80px', height: 'auto' }} />
      </div>

      {/* Optional back nav */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute z-20 flex items-center gap-1"
          style={{ top: '6%', left: '8%', color: '#F7D08D', fontFamily: 'var(--font-display)', fontSize: '0.7rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="#F7D08D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      )}

      {/* Optional home nav */}
      {onHome && (
        <button
          onClick={onHome}
          className="absolute z-20 flex items-center gap-1"
          style={{ top: '6%', right: '8%', color: '#F7D08D', fontFamily: 'var(--font-display)', fontSize: '0.7rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Home
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2L12 6.5V12H9V9H5V12H2V6.5L7 2Z" stroke="#F7D08D" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Screen content */}
      <div className="relative z-10 h-full flex flex-col" style={{ paddingTop: '18%', paddingBottom: '10%' }}>
        {children}
      </div>
    </div>
  )
}
