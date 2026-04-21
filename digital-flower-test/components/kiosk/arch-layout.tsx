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
    <div style={{ width: '100%', height: '100%', background: '#678F74', position: 'relative', overflow: 'hidden' }}>

      {/* Top ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-top.svg" alt="" aria-hidden="true" style={{ position: 'absolute', top: '0.5%', left: '15%', width: '70%', height: '10%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />

      {/* Bottom ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-bottom.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '0.5%', left: '15%', width: '70%', height: '10%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none', transform: 'scaleY(-1)' }} />

      {/* Back nav */}
      {onBack && (
        <button
          onClick={onBack}
          style={{ position: 'absolute', top: '4px', left: '6px', zIndex: 25, background: '#EDE2C2', border: '2px solid #724E2A', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
        >
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <path d="M18 4L8 14L18 24" stroke="#274324" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Home nav */}
      {onHome && (
        <button
          onClick={onHome}
          style={{ position: 'absolute', top: '4px', right: '6px', zIndex: 25, background: '#EDE2C2', border: '2px solid #724E2A', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
        >
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <path d="M14 4L24 13V24H18V18H10V24H4V13L14 4Z" stroke="#274324" strokeWidth="2.5" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Beige blob — elliptical rounded top */}
      <div style={{
        position: 'absolute',
        left: '3%', right: '3%',
        top: '2%', bottom: '3%',
        background: '#EDE2C2',
        border: '2.5px solid #724E2A',
        borderRadius: '50% 50% 0 0 / 18% 18% 0 0',
        zIndex: 1,
      }} />

      {/* Title in arch area */}
      {title && (
        <div style={{ position: 'absolute', top: '10%', left: '3%', right: '3%', textAlign: 'center', zIndex: 5, pointerEvents: 'none' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#274324', margin: 0 }}>
            {title}
          </h1>
        </div>
      )}

      {/* Content area — starts below arch, bounded so children h-full works */}
      <div style={{ position: 'absolute', top: '22%', left: '3%', right: '3%', bottom: '3%', zIndex: 5, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div className="flex-1 min-h-0 flex flex-col overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
