"use client"

import { useKioskStore, translations } from "@/lib/kiosk-store"
import Image from "next/image"

interface CartScreenProps {
  onHomeClick: () => void
}

export function CartScreen({ onHomeClick }: CartScreenProps) {
  const {
    language,
    mode,
    cart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    setScreen
  } = useKioskStore()
  const t = translations[language]

  const total = cart.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0)

  const handleBack = () => {
    if (mode === "guided") {
      setScreen("bouquet-details")
    } else {
      setScreen("freestyle")
    }
  }

  const handleCancel = () => {
    clearCart()
    setScreen("welcome")
  }

  return (
    <div style={{ width: '100%', height: '100%', background: '#678F74', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem' }}>

      {/* Yellow frame overlay */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/frame.svg" alt="" aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 20, pointerEvents: 'none' }} />

      {/* Top ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-top.svg" alt="" aria-hidden="true" style={{ position: 'absolute', top: '0.78%', left: '8.9%', width: '82.2%', height: '19.4%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />

      {/* Bottom ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-bottom.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '0.78%', left: '8.9%', width: '82.2%', height: '19.4%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none', transform: 'scaleY(-1)' }} />

      {/* Back nav */}
      <button
        onClick={handleBack}
        style={{ position: 'absolute', top: '6%', left: '8%', zIndex: 25, background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M18 4L8 14L18 24" stroke="#EDE2C2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Home nav */}
      <button
        onClick={onHomeClick}
        style={{ position: 'absolute', top: '6%', right: '8%', zIndex: 25, background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4L24 13V24H18V18H10V24H4V13L14 4Z" stroke="#EDE2C2" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Beige content panel */}
      <div style={{
        position: 'relative',
        zIndex: 15,
        background: '#EDE2C2',
        border: '3px solid #724F2A',
        borderRadius: '18px',
        width: '100%',
        maxWidth: '340px',
        maxHeight: '80%',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 1rem 0.85rem',
        gap: '0.65rem',
        overflow: 'hidden',
      }}>

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: '#274324', textAlign: 'center', flexShrink: 0, margin: 0 }}>
          {t.cart.title}
        </h1>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', padding: '1.2rem 0' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(39,67,36,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#274324', textAlign: 'center' }}>{t.cart.empty}</p>
            <button
              onClick={() => setScreen("mode-selection")}
              style={{ background: '#EDE2C2', border: '2.5px solid #FDAA5C', borderRadius: '12px', padding: '0.6rem 1.2rem', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem', color: '#274324' }}
            >
              {t.cart.addAnother}
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable items + summary */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>

              {/* Cart item cards */}
              {cart.map((item) => (
                <div key={item.id} style={{
                  background: '#678F74',
                  border: '2px solid #274324',
                  borderRadius: '12px',
                  padding: '0.55rem 0.6rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    position: 'relative', width: '54px', height: '54px', flexShrink: 0,
                    overflow: 'hidden', borderRadius: '8px',
                    border: '2px solid #FDAA5C',
                    background: '#F7D08D',
                  }}>
                    <Image src={item.bouquet.image} alt={item.bouquet.name} fill className="object-cover" />
                  </div>

                  {/* Name + flower + stepper */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem', color: '#FFFFFF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                      {item.bouquet.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '0.68rem', color: 'rgba(255,255,255,0.8)', margin: '2px 0 5px' }}>
                      {item.customization.mainFlower?.name} ×{item.customization.mainFlowerCount}
                    </p>
                    {/* Qty stepper */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <button
                        onClick={() => { if (item.quantity > 1) updateCartItemQuantity(item.id, item.quantity - 1) }}
                        disabled={item.quantity <= 1}
                        style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: item.quantity <= 1 ? 'rgba(247,208,141,0.35)' : '#F7D08D',
                          border: 'none', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#274324', fontSize: '1rem', fontWeight: 700, lineHeight: 1, flexShrink: 0,
                        }}
                      >−</button>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem', color: '#FFFFFF', minWidth: '14px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: '#F7D08D',
                          border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#274324', fontSize: '1rem', fontWeight: 700, lineHeight: 1, flexShrink: 0,
                        }}
                      >+</button>
                    </div>
                  </div>

                  {/* Price + trash */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.82rem', color: '#FFFFFF' }}>
                      {(item.totalPrice * item.quantity).toFixed(2)}€
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add another bouquet */}
              <button
                onClick={() => setScreen("mode-selection")}
                style={{
                  background: '#EDE2C2', border: '2.5px solid #FDAA5C', borderRadius: '12px',
                  padding: '0.55rem', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem', color: '#274324',
                  width: '100%', flexShrink: 0,
                }}
              >
                + {t.cart.addAnother}
              </button>

              {/* Order summary */}
              <div style={{
                background: '#678F74', border: '2px solid #274324', borderRadius: '12px',
                padding: '0.6rem 0.7rem', flexShrink: 0, marginTop: '0.4rem',
              }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.22rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '0.68rem', color: '#FFFFFF', flex: 1, marginRight: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.bouquet.name} ×{item.quantity}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '0.68rem', color: '#FFFFFF', flexShrink: 0 }}>
                      {(item.totalPrice * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.28)', margin: '0.4rem 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem', color: '#FFFFFF' }}>{t.cart.total}</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '0.78rem', color: '#FFFFFF' }}>
                    {total.toFixed(2)}€
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom action row */}
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              <button
                onClick={handleCancel}
                style={{
                  background: '#EDE2C2', border: '2.5px solid #FDAA5C', borderRadius: '12px',
                  padding: '0.6rem 0.85rem', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.72rem', color: '#274324',
                  flexShrink: 0,
                }}
              >
                {t.navigation.cancel}
              </button>
              <button
                onClick={() => setScreen("payment")}
                style={{
                  flex: 1, background: '#F7D08D', border: '2.5px solid #FDAA5C', borderRadius: '12px',
                  padding: '0.6rem', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem', color: '#274324',
                }}
              >
                {t.cart.checkout}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
