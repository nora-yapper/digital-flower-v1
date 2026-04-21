"use client"

import { useState, useEffect } from "react"
import { useKioskStore, translations, mainFlowers, fillerFlowers, greeneryOptions, wrappingOptions } from "@/lib/kiosk-store"
import { ArchLayout } from "./arch-layout"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

interface FreestyleScreenProps {
  onHomeClick: () => void
}

type CustomizationCategory = 'main' | 'filler' | 'greenery' | 'wrapping' | 'note'

export function FreestyleScreen({ onHomeClick }: FreestyleScreenProps) {
  const {
    language,
    customization,
    updateCustomization,
    resetCustomization,
    addToCart,
    setScreen,
    cart
  } = useKioskStore()
  const t = translations[language]

  const [activeCategory, setActiveCategory] = useState<CustomizationCategory>('main')

  useEffect(() => {
    resetCustomization()
  }, [resetCustomization])

  const calculatePrice = () => {
    let price = 15
    if (customization.mainFlowerCount === 5) price += 5
    if (customization.mainFlowerCount === 7) price += 10
    if (customization.fillerFlower) price += 3
    price += customization.greenery.length * 2
    if (customization.wrapping?.premium) {
      price += customization.wrapping.price
    }
    return price
  }

  const price = calculatePrice()

  const categories: { id: CustomizationCategory; label: string }[] = [
    { id: 'main', label: t.customization.mainFlowers },
    { id: 'filler', label: t.customization.fillerFlowers },
    { id: 'greenery', label: t.customization.greenery },
    { id: 'wrapping', label: t.customization.wrapping },
    { id: 'note', label: t.customization.note },
  ]

  const handleAddToCart = () => {
    const cartItem = {
      id: `freestyle-${Date.now()}`,
      bouquet: {
        id: 'freestyle',
        name: 'Custom Bouquet',
        description: 'Your custom creation',
        color: 'Custom',
        image: '/placeholder.svg?height=300&width=300',
        priceIndicator: '$$' as const,
        basePrice: 15,
        recipients: [],
        occasions: [],
      },
      customization: { ...customization },
      quantity: 1,
      totalPrice: price,
    }
    addToCart(cartItem)
    setScreen("cart")
  }

  const optionCard = (isSelected: boolean, isDisabled?: boolean) => ({
    border: `1.5px solid ${isSelected ? '#678F74' : 'rgba(114,78,42,0.2)'}`,
    background: isSelected ? 'rgba(103,143,116,0.12)' : 'transparent',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.4 : 1,
    padding: '0.35rem',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '3px',
  })

  const renderContent = () => {
    switch (activeCategory) {
      case 'main':
        return (
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', color: '#724E2A', marginBottom: '0.5rem' }}>
              {t.customization.mainFlowersDesc}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginBottom: '0.6rem' }}>
              {mainFlowers.map((flower) => (
                <button
                  key={flower.id}
                  onClick={() => updateCustomization({ mainFlower: flower })}
                  style={optionCard(customization.mainFlower?.id === flower.id)}
                >
                  <div style={{ position: 'relative', aspectRatio: '1', width: '100%', overflow: 'hidden' }}>
                    <Image src={flower.image} alt={flower.name} fill className="object-cover" />
                    {customization.mainFlower?.id === flower.id && (
                      <div style={{ position: 'absolute', top: '3px', right: '3px', background: '#678F74', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#EDE2C2" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: '#274324', textAlign: 'center' }}>{flower.name}</span>
                </button>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', color: '#724E2A', marginBottom: '0.3rem' }}>{t.customization.count}</p>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {([3, 5, 7] as const).map((count) => (
                  <button
                    key={count}
                    onClick={() => updateCustomization({ mainFlowerCount: count })}
                    style={{
                      padding: '0.3rem 0.6rem',
                      background: customization.mainFlowerCount === count ? '#678F74' : 'transparent',
                      color: customization.mainFlowerCount === count ? '#EDE2C2' : '#274324',
                      border: `1.5px solid ${customization.mainFlowerCount === count ? '#678F74' : 'rgba(114,78,42,0.3)'}`,
                      cursor: 'pointer',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                    }}
                  >{count}</button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'filler':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
            {fillerFlowers.map((flower) => (
              <button
                key={flower.id}
                onClick={() => updateCustomization({ fillerFlower: flower })}
                style={optionCard(customization.fillerFlower?.id === flower.id)}
              >
                <div style={{ position: 'relative', aspectRatio: '1', width: '100%', overflow: 'hidden' }}>
                  <Image src={flower.image} alt={flower.name} fill className="object-cover" />
                  {customization.fillerFlower?.id === flower.id && (
                    <div style={{ position: 'absolute', top: '3px', right: '3px', background: '#678F74', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#EDE2C2" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: '#274324', textAlign: 'center' }}>{flower.name}</span>
              </button>
            ))}
          </div>
        )

      case 'greenery':
        return (
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.62rem', color: '#724E2A', marginBottom: '0.5rem' }}>
              {t.customization.greeneryDesc}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
              {greeneryOptions.map((green) => {
                const isSelected = customization.greenery.some(g => g.id === green.id)
                const canSelect = customization.greenery.length < 3 || isSelected
                return (
                  <button
                    key={green.id}
                    onClick={() => {
                      if (!canSelect) return
                      if (isSelected) {
                        updateCustomization({ greenery: customization.greenery.filter(g => g.id !== green.id) })
                      } else {
                        updateCustomization({ greenery: [...customization.greenery, green] })
                      }
                    }}
                    style={optionCard(isSelected, !canSelect)}
                  >
                    <div style={{ position: 'relative', aspectRatio: '1', width: '100%', overflow: 'hidden' }}>
                      <Image src={green.image} alt={green.name} fill className="object-cover" />
                      {isSelected && (
                        <div style={{ position: 'absolute', top: '3px', right: '3px', background: '#678F74', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#EDE2C2" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      )}
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: '#274324', textAlign: 'center' }}>{green.name}</span>
                  </button>
                )
              })}
            </div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: '#724E2A', marginTop: '0.4rem' }}>
              Selected: {customization.greenery.length}/3
            </p>
          </div>
        )

      case 'wrapping':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' }}>
            {wrappingOptions.map((wrap) => (
              <button
                key={wrap.id}
                onClick={() => updateCustomization({ wrapping: wrap })}
                style={optionCard(customization.wrapping?.id === wrap.id)}
              >
                <div style={{ position: 'relative', aspectRatio: '1', width: '100%', overflow: 'hidden' }}>
                  <Image src={wrap.image} alt={wrap.name} fill className="object-cover" />
                  {customization.wrapping?.id === wrap.id && (
                    <div style={{ position: 'absolute', top: '3px', right: '3px', background: '#678F74', borderRadius: '50%', width: '14px', height: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="8" height="8" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke="#EDE2C2" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  )}
                  {wrap.premium && (
                    <div style={{ position: 'absolute', bottom: '3px', left: '3px', background: '#FDAA5C', color: '#274324', fontFamily: 'var(--font-display)', fontSize: '0.5rem', fontWeight: 700, padding: '1px 4px' }}>
                      +{wrap.price}€
                    </div>
                  )}
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: '#274324', textAlign: 'center' }}>{wrap.name}</span>
              </button>
            ))}
          </div>
        )

      case 'note':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>
              <label style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, color: '#274324', display: 'block', marginBottom: '0.3rem' }}>Message</label>
              <Textarea
                placeholder="Write your message here..."
                value={customization.noteMessage}
                onChange={(e) => updateCustomization({ noteMessage: e.target.value })}
                className="min-h-16 text-xs resize-none"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', background: 'rgba(237,226,194,0.6)', border: '1px solid rgba(114,78,42,0.25)' }}
              />
            </div>
            <div>
              <label style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, color: '#274324', display: 'block', marginBottom: '0.3rem' }}>From</label>
              <Input
                placeholder="Name or initials"
                value={customization.noteFrom}
                onChange={(e) => updateCustomization({ noteFrom: e.target.value })}
                className="h-8 text-xs"
                style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', background: 'rgba(237,226,194,0.6)', border: '1px solid rgba(114,78,42,0.25)' }}
              />
            </div>
          </div>
        )
    }
  }

  return (
    <ArchLayout
      onBack={() => setScreen("mode-selection")}
      onHome={onHomeClick}
      title={t.modeSelection.freestyle.title}
    >
      <div className="flex flex-col h-full px-3 pt-1 pb-3 gap-2">
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                flex: 1,
                padding: '0.3rem 0.1rem',
                background: activeCategory === cat.id ? '#678F74' : 'transparent',
                color: activeCategory === cat.id ? '#EDE2C2' : '#724E2A',
                border: `1.5px solid ${activeCategory === cat.id ? '#678F74' : 'rgba(114,78,42,0.25)'}`,
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: '0.52rem',
                fontWeight: activeCategory === cat.id ? 700 : 400,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {renderContent()}
        </div>

        {/* Price bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.6rem', background: 'rgba(103,143,116,0.1)', borderTop: '1.5px solid rgba(103,143,116,0.25)', flexShrink: 0 }}>
          <div style={{ width: '36px', height: '36px', background: 'rgba(103,143,116,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#678F74" strokeWidth="1.5"><path d="M12 2a9 9 0 0 1 9 9c0 4.97-9 13-9 13S3 15.97 3 11a9 9 0 0 1 9-9z"/><circle cx="12" cy="11" r="2.5"/></svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.7rem', color: '#274324' }}>Custom Bouquet</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: '#724E2A' }}>
              {customization.mainFlower?.name || 'Select flowers'}
              {customization.mainFlower && ` ×${customization.mainFlowerCount}`}
            </p>
          </div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#FDAA5C', fontWeight: 600, flexShrink: 0 }}>
            {price.toFixed(2)} EUR
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
          <button
            onClick={handleAddToCart}
            disabled={!customization.mainFlower}
            style={{
              flex: 1, padding: '0.55rem',
              background: customization.mainFlower ? '#274324' : 'rgba(39,67,36,0.3)',
              color: '#F7D08D',
              fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700,
              border: 'none', cursor: customization.mainFlower ? 'pointer' : 'not-allowed',
            }}
          >
            {t.navigation.addToCart}
          </button>
          <button
            onClick={() => resetCustomization()}
            style={{ padding: '0.55rem 0.7rem', background: 'transparent', color: '#724E2A', fontFamily: 'var(--font-display)', fontSize: '0.7rem', border: '1.5px solid rgba(114,78,42,0.3)', cursor: 'pointer' }}
          >
            {t.customization.startOver}
          </button>
          {cart.length > 0 && (
            <button
              onClick={() => setScreen("cart")}
              style={{ padding: '0.55rem 0.7rem', background: 'rgba(103,143,116,0.15)', color: '#678F74', fontFamily: 'var(--font-display)', fontSize: '0.65rem', border: '1.5px solid rgba(103,143,116,0.4)', cursor: 'pointer' }}
            >
              Cart ({cart.length})
            </button>
          )}
        </div>
      </div>
    </ArchLayout>
  )
}
