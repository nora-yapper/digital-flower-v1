"use client"

import { useState } from "react"
import { useKioskStore, translations, mainFlowers, fillerFlowers, greeneryOptions, wrappingOptions, calculateBouquetPrice } from "@/lib/kiosk-store"
import { ArchLayout } from "./arch-layout"
import Image from "next/image"

interface CustomizationScreenProps {
  onHomeClick: () => void
}

type CustomizationCategory = 'main' | 'filler' | 'greenery' | 'wrapping'

export function CustomizationScreen({ onHomeClick }: CustomizationScreenProps) {
  const {
    language,
    selectedBouquet,
    customization,
    updateCustomization,
    addToCart,
    setScreen
  } = useKioskStore()
  const t = translations[language]

  const [activeCategory, setActiveCategory] = useState<CustomizationCategory>('main')

  if (!selectedBouquet) {
    setScreen("recommendations")
    return null
  }

  const price = calculateBouquetPrice(customization, selectedBouquet.basePrice)

  const categories: { id: CustomizationCategory; label: string }[] = [
    { id: 'main', label: t.customization.mainFlowers },
    { id: 'filler', label: t.customization.fillerFlowers },
    { id: 'greenery', label: t.customization.greenery },
    { id: 'wrapping', label: t.customization.wrapping },
  ]

  const handleAddToCart = () => {
    const cartItem = {
      id: `${selectedBouquet.id}-${Date.now()}`,
      bouquet: selectedBouquet,
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
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: '#274324', textAlign: 'center' }}>{t.flora[flower.id] ?? flower.name}</span>
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
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: '#274324', textAlign: 'center' }}>{t.flora[green.id] ?? green.name}</span>
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
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: '#274324', textAlign: 'center' }}>{t.flora[wrap.id] ?? wrap.name}</span>
              </button>
            ))}
          </div>
        )
    }
  }

  return (
    <ArchLayout
      onBack={() => setScreen("bouquet-details")}
      onHome={onHomeClick}
      title={t.customization.title}
    >
      <div className="flex flex-col h-full px-3 pt-1 pb-3 gap-2">
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                flex: 1,
                padding: '0.35rem 0.2rem',
                background: activeCategory === cat.id ? '#678F74' : 'transparent',
                color: activeCategory === cat.id ? '#EDE2C2' : '#724E2A',
                border: `1.5px solid ${activeCategory === cat.id ? '#678F74' : 'rgba(114,78,42,0.25)'}`,
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: '0.58rem',
                fontWeight: activeCategory === cat.id ? 700 : 400,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {renderContent()}
        </div>

        {/* Price bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.6rem', background: 'rgba(103,143,116,0.1)', borderTop: '1.5px solid rgba(103,143,116,0.25)', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: '36px', height: '36px', overflow: 'hidden', flexShrink: 0 }}>
            <Image src={selectedBouquet.image} alt={selectedBouquet.name} fill className="object-cover" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.7rem', color: '#274324', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedBouquet.name}
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.58rem', color: '#724E2A' }}>
              {customization.mainFlower?.name} ×{customization.mainFlowerCount}
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
            style={{ flex: 1, padding: '0.55rem', background: '#274324', color: '#F7D08D', fontFamily: 'var(--font-display)', fontSize: '0.7rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            {t.navigation.addToCart}
          </button>
          <button
            onClick={() => setScreen("bouquet-details")}
            style={{ flex: 1, padding: '0.55rem', background: 'transparent', color: '#678F74', fontFamily: 'var(--font-display)', fontSize: '0.7rem', border: '1.5px solid #678F74', cursor: 'pointer' }}
          >
            {t.customization.saveChanges}
          </button>
        </div>
      </div>
    </ArchLayout>
  )
}
