"use client"

import { useState } from "react"
import { useKioskStore, translations } from "@/lib/kiosk-store"

export function WelcomeScreen() {
  const { language, setLanguage, setScreen } = useKioskStore()
  const t = translations[language]

  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null)

  const handleNext = () => setScreen("mode-selection")

  const words = t.welcome.title.split(' ')
  const greeting = words.slice(0, 2).join(' ')
  const shopName = words.slice(2).join(' ').toUpperCase()

  const btnStyle = (id: string): React.CSSProperties => ({
    position: 'relative',
    zIndex: 1,
    width: '100%',
    padding: '0.85rem 0.5rem',
    background: hoveredBtn === id ? '#F5EDD4' : '#EDE2C2',
    color: '#274324',
    fontFamily: 'var(--font-display)',
    fontSize: '0.95rem',
    fontWeight: 400,
    border: hoveredBtn === id ? '2.5px solid #F5C06A' : '2.5px solid #FDAA5C',
    borderRadius: '10px',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    transform: hoveredBtn === id ? 'scale(1.04)' : 'scale(1)',
    transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.12s ease',
  })

  return (
    <div style={{ width: '100%', height: '100%', background: '#EDE2C2', position: 'relative', overflow: 'hidden' }}>

      {/* ── Yellow frame ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svgs/frame.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      {/* ── Top ornament ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svgs/ornament-top.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '0.78%',
          left: '8.9%',
          width: '82.2%',
          height: '19.4%',
          objectFit: 'fill',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* ── Oval border ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svgs/oval-border.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '8.9%',
          top: '6.9%',
          width: '82.2%',
          height: '86.2%',
          objectFit: 'fill',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Bottom ornament ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/svgs/ornament-bottom.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '0.78%',
          left: '8.9%',
          width: '82.2%',
          height: '19.4%',
          objectFit: 'fill',
          zIndex: 10,
          pointerEvents: 'none',
          transform: 'scaleY(-1)',
        }}
      />

      {/* ── Content layer ── */}
      <div
        style={{
          position: 'absolute',
          left: '8.9%',
          top: '6.9%',
          width: '82.2%',
          height: '86.2%',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Text content — centered in the space above the buttons */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '32%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        {/* Title block */}
        <div style={{ textAlign: 'center', width: '90%' }}>
          <p
            style={{
              fontFamily: "'Pouler', var(--font-serif)",
              fontSize: '1rem',
              color: '#FFFAF0',
              fontWeight: 400,
              marginBottom: '0.15rem',
              letterSpacing: '0.04em',
            }}
          >
            {greeting}
          </p>
          <h1
            style={{
              fontFamily: "'Pouler', var(--font-serif)",
              fontSize: '2.4rem',
              color: '#FFFFFF',
              fontWeight: 400,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              textShadow: '0 1px 4px rgba(0,0,0,0.15)',
            }}
          >
            {shopName}
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            marginTop: '5%',
            fontFamily: 'var(--font-display)',
            fontSize: '0.72rem',
            color: '#EDE2C2',
            textAlign: 'center',
            lineHeight: 1.6,
            width: '80%',
            opacity: 0.9,
          }}
        >
          {t.welcome.subtitle}
        </p>

        {/* Tagline */}
        <p
          style={{
            marginTop: '2.5%',
            fontFamily: 'var(--font-display)',
            fontSize: '0.62rem',
            color: '#EDE2C2',
            fontStyle: 'italic',
            letterSpacing: '0.04em',
            opacity: 0.75,
          }}
        >
          {t.welcome.tagline}
        </p>

        </div>{/* end text content wrapper */}

        {/* Button area — fixed position so text length above never shifts it */}
        <div style={{ position: 'absolute', bottom: '22%', width: '82%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

          {/* Language buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
            {(['en', 'hr'] as const).map((lang) => (
              <div
                key={lang}
                style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center' }}
              >
                {language === lang && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src="/svgs/leaf-green.svg"
                    alt=""
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: '25%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '160px',
                      height: 'auto',
                      zIndex: 0,
                      pointerEvents: 'none',
                    }}
                  />
                )}
                <button
                  onClick={() => setLanguage(lang)}
                  onMouseEnter={() => { setLanguage(lang); setHoveredBtn(lang) }}
                  onMouseLeave={() => setHoveredBtn(null)}
                  style={btnStyle(lang)}
                >
                  {lang === 'en' ? 'English' : 'Hrvatski'}
                </button>
              </div>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            onMouseEnter={() => setHoveredBtn('next')}
            onMouseLeave={() => setHoveredBtn(null)}
            style={{
              ...btnStyle('next'),
              marginTop: '1rem',
              padding: '0.85rem 0',
              width: '50%',
              letterSpacing: '0.04em',
            }}
          >
            {language === 'hr' ? 'Dalje' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
