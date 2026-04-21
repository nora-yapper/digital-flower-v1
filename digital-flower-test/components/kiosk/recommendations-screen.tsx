"use client"

import { useKioskStore, translations, sampleBouquets, type Bouquet } from "@/lib/kiosk-store"
import Image from "next/image"

interface RecommendationsScreenProps {
  onHomeClick: () => void
}

export function RecommendationsScreen({ onHomeClick }: RecommendationsScreenProps) {
  const { language, recipient, occasion, setSelectedBouquet, setScreen } = useKioskStore()
  const t = translations[language]

  const displayBouquets = sampleBouquets.filter((b) =>
    recipient && occasion && b.recipients.includes(recipient) && b.occasions.includes(occasion)
  ).slice(0, 9)

  const handleSelectBouquet = (bouquet: Bouquet) => {
    setSelectedBouquet(bouquet)
    setScreen("bouquet-details")
  }

  return (
    <div style={{ width: '100%', height: '100%', background: '#678F74', position: 'relative', overflow: 'hidden' }}>

      {/* Top ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-top.svg" alt="" aria-hidden="true" style={{ position: 'absolute', top: '0.5%', left: '15%', width: '70%', height: '10%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />

      {/* Bottom ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-bottom.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '0.5%', left: '15%', width: '70%', height: '10%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none', transform: 'scaleY(-1)' }} />

      {/* Back nav */}
      <button
        onClick={() => setScreen("occasion")}
        style={{ position: 'absolute', top: '2%', left: '2%', zIndex: 25, background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M18 4L8 14L18 24" stroke="#EDE2C2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Home nav */}
      <button
        onClick={onHomeClick}
        style={{ position: 'absolute', top: '2%', right: '2%', zIndex: 25, background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4L24 13V24H18V18H10V24H4V13L14 4Z" stroke="#EDE2C2" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Beige blob — elliptical rounded top, extends to near bottom */}
      <div style={{
        position: 'absolute',
        left: '3%', right: '3%',
        top: '2%', bottom: '3%',
        background: '#EDE2C2',
        border: '2.5px solid #724E2A',
        borderRadius: '50% 50% 0 0 / 18% 18% 0 0',
        zIndex: 5,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 1rem 0.8rem',
      }}>

        {/* Header — padded to clear the arch curve */}
        <div style={{ textAlign: 'center', paddingTop: '22%', flexShrink: 0 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.4rem', color: '#274324', margin: 0, lineHeight: 1.1 }}>
            {t.modeSelection.guided.title}
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '0.82rem', color: '#274324', margin: '0.15rem 0 0' }}>
            Step 3 of 4
          </p>
        </div>

        {/* Section label */}
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '0.88rem', color: '#274324', textAlign: 'center', margin: '0.55rem 0 0.45rem', flexShrink: 0 }}>
          {t.recommendations.title}
        </p>

        {/* 3×3 grid */}
        {displayBouquets.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', flex: 1, minHeight: 0 }}>
            {displayBouquets.map((bouquet) => (
              <button
                key={bouquet.id}
                onClick={() => handleSelectBouquet(bouquet)}
                style={{
                  background: 'none',
                  border: '2px solid #724E2A',
                  cursor: 'pointer',
                  padding: 0,
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '1',
                  display: 'block',
                }}
              >
                <Image
                  src={bouquet.image}
                  alt={bouquet.name}
                  fill
                  className="object-cover"
                />
                {/* Text overlay at bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'rgba(237,226,194,0.9)',
                  padding: '3px 5px 4px',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '0.58rem',
                    color: '#274324', textAlign: 'center',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    margin: 0,
                  }}>
                    {bouquet.name}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.55rem',
                    color: '#724E2A', textAlign: 'right', margin: 0,
                  }}>
                    {bouquet.priceIndicator}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: '#724E2A', textAlign: 'center' }}>
              No bouquets found for this selection.
            </p>
            <button
              onClick={() => setScreen("recipient")}
              style={{ padding: '0.5rem 1.2rem', background: '#678F74', color: '#EDE2C2', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
