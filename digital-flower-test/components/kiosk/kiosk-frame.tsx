"use client"

import { ReactNode } from "react"

interface KioskFrameProps {
  children: ReactNode
}

export function KioskFrame({ children }: KioskFrameProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: '#274324' }}>
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '45 / 75',
          height: 'min(90vh, 900px)',
          maxWidth: '540px',
          width: '100%',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
