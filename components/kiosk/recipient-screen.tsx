"use client"

import { useKioskStore, translations, type Recipient } from "@/lib/kiosk-store"
import { OvalLayout } from "./oval-layout"

interface RecipientScreenProps {
  onHomeClick: () => void
}

const recipientEmoji: Record<Recipient, string> = {
  lover: '♥',
  friend: '☺',
  family: '⁂',
  deceased: '✦',
}

export function RecipientScreen({ onHomeClick }: RecipientScreenProps) {
  const { language, setRecipient, setScreen } = useKioskStore()
  const t = translations[language]

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
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3rem',
            color: '#F7D08D',
            textAlign: 'center',
            lineHeight: 1.3,
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
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 0.5rem',
                background: 'rgba(247, 208, 141, 0.12)',
                border: '1.5px solid rgba(247, 208, 141, 0.45)',
                cursor: 'pointer',
                gap: '0.4rem',
              }}
            >
              <span style={{ fontSize: '1.4rem', color: '#FDAA5C', lineHeight: 1 }}>
                {recipientEmoji[recipient.id]}
              </span>
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
