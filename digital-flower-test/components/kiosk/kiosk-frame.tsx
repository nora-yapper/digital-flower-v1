"use client"

import { ReactNode } from "react"

interface KioskFrameProps {
  children: ReactNode
}

/**
 * KioskFrame enforces a static 45:75 (3:5) aspect ratio for the kiosk display.
 * It centers the kiosk container and scales it to fit within the viewport while
 * maintaining the exact aspect ratio.
 */
export function KioskFrame({ children }: KioskFrameProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/50 p-4">
      <div 
        className="relative bg-background shadow-2xl rounded-xl overflow-hidden border border-border"
        style={{
          // 45:75 aspect ratio = 0.6 width/height ratio
          aspectRatio: '45 / 75',
          height: 'min(90vh, 900px)',
          maxWidth: '540px',
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
