"use client"

import { useState } from "react"
import { useKioskStore, translations } from "@/lib/kiosk-store"
import { ArchLayout } from "./arch-layout"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface PaymentScreenProps {
  onHomeClick: () => void
}

export function PaymentScreen({ onHomeClick }: PaymentScreenProps) {
  const {
    language,
    screen,
    cart,
    paymentMethod,
    customerName,
    customerPhone,
    setPaymentMethod,
    setCustomerName,
    setCustomerPhone,
    setOrderNumber,
    setScreen
  } = useKioskStore()
  const t = translations[language]

  const [isProcessing, setIsProcessing] = useState(false)

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0)
  }

  const handlePayment = async () => {
    if (!paymentMethod) return
    if (paymentMethod === 'cash' && (!customerName || !customerPhone)) return

    setIsProcessing(true)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod,
          customerName: customerName || null,
          customerPhone: customerPhone || null,
          cart,
          total: calculateTotal(),
          language,
        }),
      })
      const data = await response.json()
      setOrderNumber(data.orderNumber)
      setScreen('confirmation')
    } catch {
      const orderNum = `#${Math.floor(Math.random() * 900) + 100}`
      setOrderNumber(orderNum)
      setScreen('confirmation')
    } finally {
      setIsProcessing(false)
    }
  }

  const showMethodSelection = screen === 'payment'
  const showCardInstructions = screen === 'payment-card'
  const showCashForm = screen === 'payment-cash'

  const handleBack = () => {
    if (showCardInstructions || showCashForm) {
      setScreen("payment")
    } else {
      setScreen("cart")
    }
  }

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <ArchLayout
      onBack={handleBack}
      onHome={!isProcessing ? onHomeClick : undefined}
      title={t.payment.title}
    >
      <div className="flex flex-col h-full items-center px-6 pt-3 pb-4 gap-4">
        {/* Total card */}
        <div style={{ width: '100%', padding: '0.75rem', background: 'rgba(103,143,116,0.1)', border: '1.5px solid rgba(103,143,116,0.3)', borderRadius: '14px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#724E2A', marginBottom: '0.2rem' }}>{t.payment.total}</p>
          <p style={{ fontFamily: "'Pouler', var(--font-serif)", fontSize: '2rem', color: '#FDAA5C', fontWeight: 400 }}>
            {calculateTotal().toFixed(2)} EUR
          </p>
        </div>

        {/* Method selection */}
        {showMethodSelection && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h2 style={{ fontFamily: "'Pouler', var(--font-serif)", fontSize: '1rem', color: '#274324', textAlign: 'center' }}>
              {t.payment.paymentMethod}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {/* Card */}
              <button
                onClick={() => setPaymentMethod("card")}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0.75rem', gap: '0.4rem',
                  background: paymentMethod === 'card' ? 'rgba(103,143,116,0.15)' : 'transparent',
                  border: `2px solid ${paymentMethod === 'card' ? '#678F74' : 'rgba(114,78,42,0.25)'}`,
                  borderRadius: '14px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: paymentMethod === 'card' ? '#678F74' : 'rgba(103,143,116,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={paymentMethod === 'card' ? '#EDE2C2' : '#678F74'} strokeWidth="1.5">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', color: '#274324' }}>{t.payment.card}</span>
              </button>

              {/* Cash */}
              <button
                onClick={() => setPaymentMethod("cash")}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0.75rem', gap: '0.4rem',
                  background: paymentMethod === 'cash' ? 'rgba(103,143,116,0.15)' : 'transparent',
                  border: `2px solid ${paymentMethod === 'cash' ? '#678F74' : 'rgba(114,78,42,0.25)'}`,
                  borderRadius: '14px',
                  cursor: 'pointer',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: paymentMethod === 'cash' ? '#678F74' : 'rgba(103,143,116,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={paymentMethod === 'cash' ? '#EDE2C2' : '#678F74'} strokeWidth="1.5">
                    <rect x="2" y="6" width="20" height="12" rx="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <path d="M6 12h.01M18 12h.01"/>
                  </svg>
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.82rem', color: '#274324' }}>{t.payment.cash}</span>
              </button>
            </div>

            <button
              disabled={!paymentMethod}
              onClick={() => {
                if (paymentMethod === 'card') setScreen("payment-card")
                else setScreen("payment-cash")
              }}
              style={{
                ...btnBase,
                padding: '0.75rem',
                background: paymentMethod ? '#274324' : 'rgba(39,67,36,0.25)',
                color: '#F7D08D',
                cursor: paymentMethod ? 'pointer' : 'not-allowed',
                borderRadius: '20px',
                marginTop: '0.25rem',
              }}
            >
              {t.navigation.next}
            </button>
          </div>
        )}

        {/* Card instructions */}
        {showCardInstructions && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ padding: '1.25rem', background: 'rgba(103,143,116,0.1)', border: '1.5px solid rgba(103,143,116,0.3)', borderRadius: '14px', textAlign: 'center', width: '100%' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#678F74" strokeWidth="1.2" style={{ margin: '0 auto 0.75rem' }}>
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: '#274324', lineHeight: 1.5 }}>
                {t.payment.cardInstructions}
              </p>
            </div>
            <button
              disabled={isProcessing}
              onClick={handlePayment}
              style={{ ...btnBase, padding: '0.75rem', background: '#274324', color: '#F7D08D', width: '100%', borderRadius: '20px', cursor: isProcessing ? 'wait' : 'pointer' }}
            >
              {isProcessing ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <Loader2 size={14} className="animate-spin" />
                  Processing...
                </span>
              ) : t.payment.placeOrder}
            </button>
          </div>
        )}

        {/* Cash form */}
        {showCashForm && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(237,226,194,0.5)', border: '1px solid rgba(114,78,42,0.2)', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div>
                <label style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, color: '#274324', display: 'block', marginBottom: '0.3rem' }}>
                  {t.payment.cashName}
                </label>
                <Input
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="text-xs h-9"
                  style={{ fontFamily: 'var(--font-sans)', background: 'rgba(237,226,194,0.8)', border: '1px solid rgba(114,78,42,0.3)', borderRadius: '8px' }}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, color: '#274324', display: 'block', marginBottom: '0.3rem' }}>
                  {t.payment.cashPhone}
                </label>
                <Input
                  placeholder="Enter your phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="text-xs h-9"
                  type="tel"
                  style={{ fontFamily: 'var(--font-sans)', background: 'rgba(237,226,194,0.8)', border: '1px solid rgba(114,78,42,0.3)', borderRadius: '8px' }}
                />
              </div>
            </div>
            <button
              disabled={isProcessing || !customerName || !customerPhone}
              onClick={handlePayment}
              style={{
                ...btnBase,
                padding: '0.75rem',
                background: (isProcessing || !customerName || !customerPhone) ? 'rgba(39,67,36,0.25)' : '#274324',
                color: '#F7D08D',
                borderRadius: '20px',
                cursor: (isProcessing || !customerName || !customerPhone) ? 'not-allowed' : 'pointer',
              }}
            >
              {isProcessing ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <Loader2 size={14} className="animate-spin" />
                  Processing...
                </span>
              ) : t.payment.placeOrder}
            </button>
          </div>
        )}
      </div>
    </ArchLayout>
  )
}
