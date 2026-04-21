"use client"

import { useKioskStore, translations } from "@/lib/kiosk-store"
import { ArchLayout } from "./arch-layout"
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

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0)
  }

  const handleBack = () => {
    if (mode === "guided") {
      setScreen("bouquet-details")
    } else {
      setScreen("freestyle")
    }
  }

  const handleAddAnother = () => {
    setScreen("mode-selection")
  }

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: '0.7rem',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <ArchLayout
      onBack={handleBack}
      onHome={onHomeClick}
      title={t.cart.title}
    >
      <div className="flex flex-col h-full px-4 pt-2 pb-3">
        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(39,67,36,0.25)" strokeWidth="1">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#274324' }}>{t.cart.empty}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: '#724E2A', textAlign: 'center' }}>
              Add some beautiful flowers to get started
            </p>
            <button
              onClick={() => setScreen("mode-selection")}
              style={{ ...btnBase, padding: '0.6rem 1.2rem', background: '#678F74', color: '#EDE2C2' }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', minHeight: 0 }}>
            {/* Cart items */}
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  padding: '0.6rem',
                  background: 'rgba(103,143,116,0.06)',
                  border: '1px solid rgba(114,78,42,0.15)',
                }}
              >
                <div style={{ position: 'relative', width: '52px', height: '52px', flexShrink: 0, overflow: 'hidden' }}>
                  <Image src={item.bouquet.image} alt={item.bouquet.name} fill className="object-cover" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', color: '#274324', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.bouquet.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: '#724E2A', marginTop: '2px' }}>
                    {item.customization.mainFlower?.name} ×{item.customization.mainFlowerCount}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
                    <button
                      onClick={() => { if (item.quantity > 1) updateCartItemQuantity(item.id, item.quantity - 1) }}
                      disabled={item.quantity <= 1}
                      style={{ width: '22px', height: '22px', background: 'transparent', border: '1.5px solid rgba(114,78,42,0.3)', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', opacity: item.quantity <= 1 ? 0.35 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#274324' }}
                    >−</button>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: '#274324', fontWeight: 700, minWidth: '14px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                      style={{ width: '22px', height: '22px', background: 'transparent', border: '1.5px solid rgba(114,78,42,0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#274324' }}
                    >+</button>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: '#FDAA5C', fontWeight: 600 }}>
                    {(item.totalPrice * item.quantity).toFixed(2)} EUR
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ marginTop: '0.3rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(180,40,40,0.6)" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Add another */}
            <button
              onClick={handleAddAnother}
              style={{ ...btnBase, padding: '0.5rem', background: 'transparent', color: '#678F74', border: '1.5px dashed rgba(103,143,116,0.5)', width: '100%', flexShrink: 0 }}
            >
              + {t.cart.addAnother}
            </button>

            {/* Order summary */}
            <div style={{ background: 'rgba(103,143,116,0.08)', padding: '0.7rem', borderTop: '1.5px solid rgba(103,143,116,0.25)', flexShrink: 0, marginTop: 'auto' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: '#724E2A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: '0.5rem' }}>
                    {item.bouquet.name} ×{item.quantity}
                  </span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: '#274324', flexShrink: 0 }}>
                    {(item.totalPrice * item.quantity).toFixed(2)} EUR
                  </span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(103,143,116,0.2)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, color: '#274324' }}>{t.cart.total}</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#FDAA5C', fontWeight: 600 }}>
                  {calculateTotal().toFixed(2)} EUR
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={() => setScreen("payment")}
              style={{ ...btnBase, padding: '0.7rem', background: '#274324', color: '#F7D08D', width: '100%', fontSize: '0.8rem', flexShrink: 0 }}
            >
              {t.cart.checkout}
            </button>
            <button
              onClick={clearCart}
              style={{ ...btnBase, padding: '0.4rem', background: 'transparent', color: 'rgba(180,40,40,0.6)', border: 'none', width: '100%', fontWeight: 400, fontSize: '0.65rem', flexShrink: 0 }}
            >
              {t.cart.cancelOrder}
            </button>
          </div>
        )}
      </div>
    </ArchLayout>
  )
}
