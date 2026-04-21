"use client"

import { useState } from "react"
import { useKioskStore, translations } from "@/lib/kiosk-store"

export function WelcomeScreen() {
  const { language, setLanguage, setScreen } = useKioskStore()
  const t = translations[language]

  // Language selection is decoupled from navigation — user picks then taps Next
  const [selectedLang, setSelectedLang] = useState<'en' | 'hr'>(language)

  const handleNext = () => {
    setLanguage(selectedLang)
    setScreen("mode-selection")
  }

  // Split title: first two words = greeting, rest = shop name
  const words = t.welcome.title.split(' ')
  const greeting = words.slice(0, 2).join(' ')        // "Welcome to" / "Dobrodosli u"
  const shopName = words.slice(2).join(' ').toUpperCase() // "THE FLOWER SHOP" / "CVJEĆARNICU"

  const btnStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '0.55rem 0.25rem',
    background: '#EDE2C2',
    color: '#274324',
    fontFamily: 'var(--font-display)',
    fontSize: '0.85rem',
    fontWeight: 400,
    border: active ? '2.5px solid #274324' : '2px solid #724E2A',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    boxShadow: active ? 'inset 0 0 0 1px #FDAA5C' : 'none',
  })

  return (
    <div style={{ width: '100%', height: '100%', background: '#EDE2C2', position: 'relative', overflow: 'hidden' }}>

      {/* ── Top ornament: overlaps top of oval ── */}
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

      {/* ── Bottom ornament: overlaps bottom of oval, flipped ── */}
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

      {/* ── Content layer — sits above oval, below ornaments ── */}
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
        {/* Title block — ~19% from oval top */}
        <div style={{ marginTop: '19%', textAlign: 'center', width: '90%' }}>
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

        {/* Language row: [English] [leaf] [Hrvatski] */}
        <div
          style={{
            marginTop: '8%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: '82%',
          }}
        >
          <button onClick={() => setSelectedLang('en')} style={btnStyle(selectedLang === 'en')}>
            English
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/svgs/leaf-logo.svg"
            alt=""
            aria-hidden="true"
            style={{ width: '38px', height: 'auto', flexShrink: 0 }}
          />

          <button onClick={() => setSelectedLang('hr')} style={btnStyle(selectedLang === 'hr')}>
            Hrvatski
          </button>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          style={{
            marginTop: '3.5%',
            padding: '0.55rem 0',
            width: '50%',
            background: '#EDE2C2',
            color: '#274324',
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: 400,
            border: '2px solid #724E2A',
            cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
