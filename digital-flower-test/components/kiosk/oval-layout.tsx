"use client"

import { ReactNode } from "react"

interface OvalLayoutProps {
  children: ReactNode
  onBack?: () => void
  onHome?: () => void
}

export function OvalLayout({ children, onBack, onHome }: OvalLayoutProps) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#EDE2C2', position: 'relative', overflow: 'hidden' }}>

      {/* Yellow frame */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/frame.svg" alt="" aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 20, pointerEvents: 'none' }} />

      {/* Top ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-top.svg" alt="" aria-hidden="true" style={{ position: 'absolute', top: '0.78%', left: '8.9%', width: '82.2%', height: '19.4%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />

      {/* Oval border */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/oval-border.svg" alt="" aria-hidden="true" style={{ position: 'absolute', left: '8.9%', top: '6.9%', width: '82.2%', height: '86.2%', objectFit: 'fill', zIndex: 1, pointerEvents: 'none' }} />

      {/* Bottom ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-bottom.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '0.78%', left: '8.9%', width: '82.2%', height: '19.4%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none', transform: 'scaleY(-1)' }} />

      {/* Back nav */}
      {onBack && (
        <button
          onClick={onBack}
          style={{ position: 'absolute', top: '6%', left: '8%', zIndex: 15, background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M18 4L8 14L18 24" stroke="#678F74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Home nav */}
      {onHome && (
        <button
          onClick={onHome}
          style={{ position: 'absolute', top: '6%', right: '8%', zIndex: 15, background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 4L24 13V24H18V18H10V24H4V13L14 4Z" stroke="#678F74" strokeWidth="2.5" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Content sits inside the oval area */}
      <div style={{ position: 'absolute', left: '8.9%', top: '6.9%', width: '82.2%', height: '86.2%', zIndex: 5, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}
