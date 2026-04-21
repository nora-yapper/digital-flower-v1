"use client"

import { useEffect, useState } from "react"
import { useKioskStore, translations } from "@/lib/kiosk-store"
import { ArchLayout } from "./arch-layout"

export function ConfirmationScreen() {
  const { language, orderNumber, resetSession, clearCart } = useKioskStore()
  const t = translations[language]

  const [displayOrderNumber] = useState(() =>
    orderNumber || `#${Math.floor(Math.random() * 900) + 100}`
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart()
      resetSession()
    }, 30000)
    return () => clearTimeout(timer)
  }, [clearCart, resetSession])

  const handleNewOrder = () => {
    clearCart()
    resetSession()
  }

  return (
    <ArchLayout title={t.confirmation.title}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', padding: '1rem 1.5rem' }}>
        {/* Success indicator */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'rgba(103,143,116,0.2)',
              animation: 'ping 1s cubic-bezier(0,0,0.2,1) infinite',
            }}
          />
          <div style={{
            position: 'relative', width: '56px', height: '56px', borderRadius: '50%',
            background: '#678F74', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EDE2C2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#274324', textAlign: 'center', lineHeight: 1.3 }}>
          {t.confirmation.title}
        </h1>

        {/* Order number */}
        <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(103,143,116,0.1)', border: '1.5px solid rgba(103,143,116,0.3)', textAlign: 'center', width: '100%' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#724E2A', marginBottom: '0.3rem' }}>{t.confirmation.orderNumber}</p>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FDAA5C', fontWeight: 700, lineHeight: 1 }}>
            {displayOrderNumber}
          </p>
        </div>

        {/* Leaf decoration */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', textAlign: 'center', maxWidth: '260px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svgs/leaf-logo.svg" alt="" aria-hidden="true" style={{ width: '48px', opacity: 0.6, filter: 'hue-rotate(90deg) saturate(0.5)' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.72rem', color: '#274324', lineHeight: 1.5 }}>
            {t.confirmation.message}
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#724E2A', lineHeight: 1.4 }}>
            {t.confirmation.estimatedTime}{' '}
            <strong style={{ color: '#678F74' }}>{t.confirmation.timeRange}</strong>
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', color: '#724E2A', opacity: 0.8 }}>
            {t.confirmation.contactMessage}
          </p>
        </div>

        {/* New order button */}
        <button
          onClick={handleNewOrder}
          style={{
            padding: '0.7rem 2rem',
            background: '#274324',
            color: '#F7D08D',
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
        >
          {t.confirmation.newOrder}
        </button>

        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: '#724E2A', opacity: 0.5 }}>
          This screen will automatically reset in 30 seconds
        </p>
      </div>
    </ArchLayout>
  )
}
