"use client"

import { useState } from "react"
import { useKioskStore, translations, type Recipient } from "@/lib/kiosk-store"
import { OvalLayout } from "./oval-layout"

interface RecipientScreenProps {
  onHomeClick: () => void
}

const recipientIcon: Record<Recipient, string> = {
  lover: '/svgs/icons/icon-lover.svg',
  friend: '/svgs/icons/icon-friend.svg',
  family: '/svgs/icons/icon-family.svg',
  deceased: '/svgs/icons/icon-deceased.svg',
}

export function RecipientScreen({ onHomeClick }: RecipientScreenProps) {
  const { language, setRecipient, setScreen } = useKioskStore()
  const t = translations[language]

  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)

  const recipients: { id: Recipient; label: string }[] = [
    { id: 'lover', label: t.recipients.lover },
    { id: 'friend', label: t.recipients.friend },
    { id: 'family', label: t.recipients.family },
    { id: 'deceased', label: t.recipients.deceased },
  ]

  const handleSelect = (recipient: Recipient) => {
    setRecipient(recipient)
    setScreen("occasion")
  }

  const btnStyle = (id: string): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 0.5rem',
    background: hoveredBtn === id ? 'rgba(247, 208, 141, 0.22)' : 'rgba(247, 208, 141, 0.12)',
    border: hoveredBtn === id ? '2.5px solid #FDAA5C' : '2px solid rgba(247, 208, 141, 0.45)',
    borderRadius: '10px',
    cursor: 'pointer',
    gap: '0.4rem',
    transform: hoveredBtn === id ? 'scale(1.05)' : 'scale(1)',
    transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.12s ease',
  })

  return (
    <OvalLayout onBack={() => setScreen("mode-selection")} onHome={onHomeClick}>
      <div className="h-full flex flex-col items-center justify-center gap-5 px-8">
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[1,2].map((step) => (
            <div
              key={step}
              style={{
                width: step === 1 ? '20px' : '8px',
                height: '4px',
                background: step === 1 ? '#F7D08D' : 'rgba(247,208,141,0.35)',
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
          {t.recipients.title}
        </h1>

        {/* 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', width: '100%', maxWidth: '260px' }}>
          {recipients.map((recipient) => (
            <button
              key={recipient.id}
              onClick={() => handleSelect(recipient.id)}
              onMouseEnter={() => setHoveredBtn(recipient.id)}
              onMouseLeave={() => setHoveredBtn(null)}
              style={btnStyle(recipient.id)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={recipientIcon[recipient.id]} alt="" aria-hidden="true" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: '#EDE2C2', fontWeight: 500 }}>
                {recipient.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </OvalLayout>
  )
}
