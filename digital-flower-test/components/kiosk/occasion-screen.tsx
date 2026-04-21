"use client"

import { useState } from "react"
import { useKioskStore, translations, getValidOccasions, type Occasion } from "@/lib/kiosk-store"
import { OvalLayout } from "./oval-layout"

interface OccasionScreenProps {
  onHomeClick: () => void
}

const occasionIcon: Record<Occasion, string> = {
  valentine: '/svgs/icons/icon-valentine.svg',
  anniversary: '/svgs/icons/icon-anniversary.svg',
  platonic: '/svgs/icons/icon-platonic.svg',
  sacrament: '/svgs/icons/icon-sacrament.svg',
}

export function OccasionScreen({ onHomeClick }: OccasionScreenProps) {
  const { language, recipient, setOccasion, setScreen } = useKioskStore()
  const t = translations[language]

  const validOccasions = recipient ? getValidOccasions(recipient) : []
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)

  const occasions: { id: Occasion; label: string }[] = [
    { id: 'valentine', label: t.occasions.valentine },
    { id: 'anniversary', label: t.occasions.anniversary },
    { id: 'platonic', label: t.occasions.platonic },
    { id: 'sacrament', label: t.occasions.sacrament },
  ]

  const isDisabled = (occasionId: Occasion): boolean =>
    !validOccasions.includes(occasionId)

  const handleSelect = (occasion: Occasion) => {
    if (isDisabled(occasion)) return
    setOccasion(occasion)
    setScreen("recommendations")
  }

  const btnStyle = (id: string, disabled: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0.5rem',
    background: disabled
      ? 'rgba(247, 208, 141, 0.04)'
      : hoveredBtn === id
        ? 'rgba(247, 208, 141, 0.22)'
        : 'rgba(247, 208, 141, 0.12)',
    border: disabled
      ? '1.5px solid rgba(247, 208, 141, 0.15)'
      : hoveredBtn === id
        ? '2.5px solid #FDAA5C'
        : '2px solid rgba(247, 208, 141, 0.45)',
    borderRadius: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.35 : 1,
    gap: '0.4rem',
    transform: !disabled && hoveredBtn === id ? 'scale(1.05)' : 'scale(1)',
    transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.12s ease',
  })

  return (
    <OvalLayout onBack={() => setScreen("recipient")} onHome={onHomeClick}>
      <div className="h-full flex flex-col items-center justify-center gap-5 px-8">
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[1,2].map((step) => (
            <div
              key={step}
              style={{
                width: '20px',
                height: '4px',
                background: '#F7D08D',
                borderRadius: '2px',
              }}
            />
          ))}
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Pouler', var(--font-serif)",
            fontSize: '1.4rem',
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.3,
            letterSpacing: '0.04em',
          }}
        >
          {t.occasions.title}
        </h1>

        {/* 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', width: '100%', maxWidth: '260px' }}>
          {occasions.map((occasion) => {
            const disabled = isDisabled(occasion.id)
            return (
              <button
                key={occasion.id}
                onClick={() => handleSelect(occasion.id)}
                onMouseEnter={() => !disabled && setHoveredBtn(occasion.id)}
                onMouseLeave={() => setHoveredBtn(null)}
                disabled={disabled}
                style={btnStyle(occasion.id, disabled)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={occasionIcon[occasion.id]} alt="" aria-hidden="true" style={{ width: '56px', height: '56px', objectFit: 'contain', opacity: disabled ? 0.4 : 1 }} />
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: '#EDE2C2', fontWeight: 500 }}>
                  {occasion.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </OvalLayout>
  )
}
