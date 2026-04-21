"use client"

import { useKioskStore, translations, sampleBouquets, type Bouquet } from "@/lib/kiosk-store"
import { ArchLayout } from "./arch-layout"
import Image from "next/image"

interface RecommendationsScreenProps {
  onHomeClick: () => void
}

export function RecommendationsScreen({ onHomeClick }: RecommendationsScreenProps) {
  const { language, recipient, occasion, setSelectedBouquet, setScreen } = useKioskStore()
  const t = translations[language]

  const filteredBouquets = sampleBouquets.filter((bouquet) => {
    if (!recipient || !occasion) return false
    return bouquet.recipients.includes(recipient) && bouquet.occasions.includes(occasion)
  })

  const displayBouquets = filteredBouquets.slice(0, 9)

  const handleSelectBouquet = (bouquet: Bouquet) => {
    setSelectedBouquet(bouquet)
    setScreen("bouquet-details")
  }

  return (
    <ArchLayout
      onBack={() => setScreen("occasion")}
      onHome={onHomeClick}
      title={t.recommendations.title}
    >
      <div className="flex flex-col h-full px-4 pt-2 pb-3">
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.7rem',
            color: '#724E2A',
            textAlign: 'center',
            marginBottom: '0.6rem',
          }}
        >
          {t.recommendations.subtitle}
        </p>

        {/* 3×3 bouquet grid */}
        {displayBouquets.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem',
              flex: 1,
            }}
          >
            {displayBouquets.map((bouquet) => (
              <button
                key={bouquet.id}
                onClick={() => handleSelectBouquet(bouquet)}
                style={{
                  background: 'none',
                  border: '1.5px solid rgba(114, 78, 42, 0.2)',
                  cursor: 'pointer',
                  padding: 0,
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '1', width: '100%' }}>
                  <Image
                    src={bouquet.image}
                    alt={bouquet.name}
                    fill
                    className="object-cover"
                  />
                  {/* Price badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      background: '#FDAA5C',
                      color: '#274324',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.55rem',
                      fontWeight: 700,
                      padding: '2px 5px',
                    }}
                  >
                    {bouquet.priceIndicator}
                  </div>
                </div>
                <div style={{ padding: '4px 4px 5px', background: '#EDE2C2' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.65rem',
                      color: '#274324',
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {bouquet.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: '#724E2A', textAlign: 'center' }}>
              No bouquets found for this selection.
            </p>
            <button
              onClick={() => setScreen("recipient")}
              style={{
                padding: '0.5rem 1rem',
                background: '#678F74',
                color: '#EDE2C2',
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </ArchLayout>
  )
}
