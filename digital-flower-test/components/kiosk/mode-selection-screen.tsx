"use client"

import { useState } from "react"
import { useKioskStore, translations } from "@/lib/kiosk-store"
import { OvalLayout } from "./oval-layout"

interface ModeSelectionScreenProps {
  onHomeClick: () => void
}

export function ModeSelectionScreen({ onHomeClick }: ModeSelectionScreenProps) {
  const { language, setMode, setScreen } = useKioskStore()
  const t = translations[language]

  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleGuidedMode = () => {
    setMode("guided")
    setScreen("recipient")
  }

  const handleFreestyleMode = () => {
    setMode("freestyle")
    setScreen("freestyle")
  }

  const cardStyle = (id: string): React.CSSProperties => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.25rem 0.75rem',
    background: hoveredCard === id ? 'rgba(247, 208, 141, 0.22)' : 'rgba(247, 208, 141, 0.15)',
    border: hoveredCard === id ? '2.5px solid #FDAA5C' : '2px solid #F7D08D',
    borderRadius: '10px',
    cursor: 'pointer',
    gap: '0.5rem',
    position: 'relative',
    transform: hoveredCard === id ? 'scale(1.04)' : 'scale(1)',
    transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.12s ease',
  })

  return (
    <OvalLayout onBack={() => setScreen("welcome")} onHome={onHomeClick}>
      <div className="h-full flex flex-col items-center justify-center gap-6 px-8">
        {/* Title */}
        <h1
          style={{
            fontFamily: "'Pouler', var(--font-serif)",
            fontSize: '1.6rem',
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.3,
            letterSpacing: '0.04em',
          }}
        >
          {t.modeSelection.title}
        </h1>

        {/* Mode cards */}
        <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '280px' }}>

          {/* Guided mode */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleGuidedMode}
              onMouseEnter={() => setHoveredCard('guided')}
              onMouseLeave={() => setHoveredCard(null)}
              style={cardStyle('guided')}
            >
              {/* Recommended badge */}
              <span
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#FDAA5C',
                  color: '#274324',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.55rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.modeSelection.guided.recommended}
              </span>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FDAA5C" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: '#EDE2C2', fontWeight: 500 }}>
                {t.modeSelection.guided.title}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#EDE2C2', opacity: 0.7, textAlign: 'center', lineHeight: 1.4 }}>
                {t.modeSelection.guided.description}
              </span>
            </button>
          </div>

          {/* Freestyle mode */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleFreestyleMode}
              onMouseEnter={() => setHoveredCard('freestyle')}
              onMouseLeave={() => setHoveredCard(null)}
              style={cardStyle('freestyle')}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EDE2C2" strokeWidth="1.5" opacity="0.7">
                <circle cx="13.5" cy="6.5" r=".5" fill="#EDE2C2"/>
                <circle cx="17.5" cy="10.5" r=".5" fill="#EDE2C2"/>
                <circle cx="8.5" cy="7.5" r=".5" fill="#EDE2C2"/>
                <circle cx="6.5" cy="12.5" r=".5" fill="#EDE2C2"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
              </svg>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: '#EDE2C2', fontWeight: 500 }}>
                {t.modeSelection.freestyle.title}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#EDE2C2', opacity: 0.7, textAlign: 'center', lineHeight: 1.4 }}>
                {t.modeSelection.freestyle.description}
              </span>
            </button>
          </div>

        </div>
      </div>
    </OvalLayout>
  )
}
