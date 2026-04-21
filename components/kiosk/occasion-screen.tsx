"use client"

import { useKioskStore, translations, type Occasion } from "@/lib/kiosk-store"
import { OvalLayout } from "./oval-layout"

interface OccasionScreenProps {
  onHomeClick: () => void
}

const occasionEmoji: Record<Occasion, string> = {
  valentine: '♥',
  anniversary: '◈',
  platonic: '✦',
  sacrament: '✙',
}

const disabledForDeceased: Occasion[] = ['valentine', 'anniversary']

export function OccasionScreen({ onHomeClick }: OccasionScreenProps) {
  const { language, recipient, setOccasion, setScreen } = useKioskStore()
  const t = translations[language]

  const occasions: { id: Occasion; label: string }[] = [
    { id: 'valentine', label: t.occasions.valentine },
    { id: 'anniversary', label: t.occasions.anniversary },
    { id: 'platonic', label: t.occasions.platonic },
    { id: 'sacrament', label: t.occasions.sacrament },
  ]

  const isDisabled = (occasionId: Occasion): boolean => {
    if (recipient === 'deceased' && disabledForDeceased.includes(occasionId)) {
      return true
    }
    return false
  }

  const handleSelect = (occasion: Occasion) => {
    if (isDisabled(occasion)) return
    setOccasion(occasion)
    setScreen("recommendations")
  }

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
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3rem',
            color: '#F7D08D',
            textAlign: 'center',
            lineHeight: 1.3,
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
                disabled={disabled}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem 0.5rem',
                  background: disabled ? 'rgba(247, 208, 141, 0.04)' : 'rgba(247, 208, 141, 0.12)',
                  border: `1.5px solid ${disabled ? 'rgba(247, 208, 141, 0.15)' : 'rgba(247, 208, 141, 0.45)'}`,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  opacity: disabled ? 0.35 : 1,
                  gap: '0.4rem',
                }}
              >
                <span style={{ fontSize: '1.4rem', color: '#FDAA5C', lineHeight: 1 }}>
                  {occasionEmoji[occasion.id]}
                </span>
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
