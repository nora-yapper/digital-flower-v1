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

  const navBtn: React.CSSProperties = {
    position: 'absolute', top: '4px', zIndex: 25,
    background: '#EDE2C2', border: '2px solid #724E2A', borderRadius: '50%',
    width: '40px', height: '40px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
  }

  return (
    <div style={{ width: '100%', height: '100%', background: '#678F74', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem' }}>

      {/* Top ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-top.svg" alt="" aria-hidden="true" style={{ position: 'absolute', top: '0.5%', left: '15%', width: '70%', height: '10%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none' }} />

      {/* Bottom ornament */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/svgs/ornament-bottom.svg" alt="" aria-hidden="true" style={{ position: 'absolute', bottom: '0.5%', left: '15%', width: '70%', height: '10%', objectFit: 'fill', zIndex: 10, pointerEvents: 'none', transform: 'scaleY(-1)' }} />

      {/* Back nav */}
      <button onClick={handleBack} style={{ ...navBtn, left: '6px' }}>
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
          <path d="M18 4L8 14L18 24" stroke="#274324" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Home nav */}
      <button onClick={onHomeClick} style={{ ...navBtn, right: '6px' }}>
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
          <path d="M14 4L24 13V24H18V18H10V24H4V13L14 4Z" stroke="#274324" strokeWidth="2.5" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Beige content panel */}
      <div style={{
        position: 'relative', zIndex: 15,
        background: '#EDE2C2',
        border: '2px solid #724E2A',
        borderRadius: '20px',
        width: '100%', maxWidth: '360px', maxHeight: '82%',
        display: 'flex', flexDirection: 'column',
        padding: '1rem 1rem 0.85rem',
        gap: '0.6rem', overflow: 'hidden',
      }}>

        {/* Title */}
        <h1 style={{ fontFamily: "'Pouler', var(--font-serif)", fontWeight: 400, fontSize: '1.4rem', color: '#274324', textAlign: 'center', flexShrink: 0, margin: 0 }}>
          {t.cart.title}
        </h1>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', padding: '1.2rem 0' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#274324', textAlign: 'center' }}>{t.cart.empty}</p>
            <button
              onClick={() => setScreen("mode-selection")}
              style={{ background: 'transparent', border: '2px solid #FDAA5C', borderRadius: '20px', padding: '0.6rem 1.4rem', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem', color: '#274324' }}
            >
              {t.cart.addAnother}
            </button>
          </div>
        ) : (
          <>
            {/* Scrollable items + summary */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>

              {/* Cart item cards */}
              {cart.map((item) => (
                <div key={item.id} style={{
                  background: 'rgba(103,143,116,0.12)',
                  border: '1.5px solid rgba(103,143,116,0.35)',
                  borderRadius: '14px',
                  padding: '0.5rem 0.6rem',
                  display: 'flex', alignItems: 'center', gap: '0.55rem',
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    position: 'relative', width: '52px', height: '52px', flexShrink: 0,
                    overflow: 'hidden', borderRadius: '10px',
                    background: '#F7D08D',
                  }}>
                    <Image src={item.bouquet.image} alt={item.bouquet.name} fill className="object-contain" />
                  </div>

                  {/* Name + flower + stepper */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', color: '#274324', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: 0 }}>
                      {item.bouquet.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '0.62rem', color: '#724E2A', margin: '2px 0 5px' }}>
                      {item.customization.mainFlower?.name} ×{item.customization.mainFlowerCount}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <button
                        onClick={() => { if (item.quantity > 1) updateCartItemQuantity(item.id, item.quantity - 1) }}
                        disabled={item.quantity <= 1}
                        style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: item.quantity <= 1 ? 'rgba(247,208,141,0.4)' : '#F7D08D',
                          border: '1.5px solid rgba(114,78,42,0.3)',
                          cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#274324', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1, flexShrink: 0,
                        }}
                      >−</button>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.8rem', color: '#274324', minWidth: '14px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '20px', height: '20px', borderRadius: '50%',
                          background: '#F7D08D',
                          border: '1.5px solid rgba(114,78,42,0.3)',
                          cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#274324', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1, flexShrink: 0,
                        }}
                      >+</button>
                    </div>
                  </div>

                  {/* Price + trash */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Pouler', var(--font-serif)", fontWeight: 400, fontSize: '1rem', color: '#274324' }}>
                      {(item.totalPrice * item.quantity).toFixed(2)}€
                    </span>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', opacity: 0.5 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#274324" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  background: 'transparent', border: '1.5px dashed rgba(103,143,116,0.5)', borderRadius: '14px',
                  padding: '0.5rem', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.75rem', color: '#678F74',
                  width: '100%', flexShrink: 0,
                }}
              >
                + {t.cart.addAnother}
              </button>

              {/* Order summary */}
              <div style={{
                borderTop: '1.5px solid rgba(114,78,42,0.2)',
                paddingTop: '0.5rem', marginTop: '0.1rem', flexShrink: 0,
              }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.18rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '0.65rem', color: '#724E2A', flex: 1, marginRight: '0.4rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.bouquet.name} ×{item.quantity}
                    </span>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '0.65rem', color: '#724E2A', flexShrink: 0 }}>
                      {(item.totalPrice * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '0.4rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.75rem', color: '#274324' }}>{t.cart.total}</span>
                  <span style={{ fontFamily: "'Pouler', var(--font-serif)", fontWeight: 400, fontSize: '1.4rem', color: '#274324' }}>
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
                  background: 'transparent', border: '1.5px solid rgba(114,78,42,0.35)', borderRadius: '20px',
                  padding: '0.55rem 0.85rem', cursor: 'pointer',
                  fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.7rem', color: '#724E2A',
                  flexShrink: 0,
                }}
              >
                {t.navigation.cancel}
              </button>
              <button
                onClick={() => setScreen("payment")}
                style={{
                  flex: 1, background: '#F7D08D', border: '2px solid #FDAA5C', borderRadius: '20px',
                  padding: '0.55rem', cursor: 'pointer',
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
