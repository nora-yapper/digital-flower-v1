"use client"

import { useState } from "react"
import { useKioskStore, translations, calculateBouquetPrice, mainFlowers, fillerFlowers, greeneryOptions, wrappingOptions, getBouquetImage } from "@/lib/kiosk-store"
import { ArchLayout } from "./arch-layout"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

interface BouquetDetailsScreenProps {
  onHomeClick: () => void
}

export function BouquetDetailsScreen({ onHomeClick }: BouquetDetailsScreenProps) {
  const {
    language,
    selectedBouquet,
    customization,
    updateCustomization,
    addToCart,
    setScreen,
    cart
  } = useKioskStore()
  const t = translations[language]

  const [noteMessage, setNoteMessage] = useState(customization.noteMessage)
  const [noteFrom, setNoteFrom] = useState(customization.noteFrom)

  if (!selectedBouquet) {
    setScreen("recommendations")
    return null
  }

  const price = calculateBouquetPrice(customization, selectedBouquet.basePrice)

  const handleAddToCart = () => {
    updateCustomization({ noteMessage, noteFrom })
    const cartItem = {
      id: `${selectedBouquet.id}-${Date.now()}`,
      bouquet: selectedBouquet,
      customization: { ...customization, noteMessage, noteFrom },
      quantity: 1,
      totalPrice: price,
    }
    addToCart(cartItem)
    setScreen("cart")
  }

  const handleCustomize = () => {
    if (!customization.mainFlower) {
      updateCustomization({
        mainFlower: mainFlowers[0],
        fillerFlower: fillerFlowers[0],
        greenery: [greeneryOptions[0]],
        wrapping: wrappingOptions[0],
      })
    }
    setScreen("customization")
  }

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-display)',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    padding: '0.6rem 0.75rem',
    border: 'none',
    cursor: 'pointer',
    flex: 1,
    borderRadius: '10px',
  }

  return (
    <ArchLayout
      onBack={() => setScreen("recommendations")}
      onHome={onHomeClick}
      title={selectedBouquet.name}
    >
      <div className="flex flex-col h-full px-4 pt-2 pb-3 gap-3">
        {/* Bouquet image */}
        <div style={{ position: 'relative', aspectRatio: '3/4', width: '55%', margin: '0 auto', overflow: 'hidden', flexShrink: 0, background: '#EDE2C2', borderRadius: '15%' }}>
          <Image
            src={getBouquetImage(selectedBouquet, customization.mainFlowerCount)}
            alt={selectedBouquet.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Description */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#724E2A', margin: 0 }}>
            {selectedBouquet.description}
          </p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', color: '#678F74', marginTop: '2px' }}>
            {t.details.color}: {t.colors[selectedBouquet.color] ?? selectedBouquet.color}
          </p>
        </div>

        {/* Note section */}
        <div style={{ background: 'rgba(103,143,116,0.08)', padding: '0.6rem', borderLeft: '2px solid #678F74', borderRadius: '10px' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, color: '#274324', marginBottom: '0.4rem' }}>
            {t.details.message}
          </p>
          <Textarea
            placeholder={t.details.messagePlaceholder}
            value={noteMessage}
            onChange={(e) => setNoteMessage(e.target.value)}
            className="min-h-12 mb-2 text-xs resize-none"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', background: 'rgba(237,226,194,0.6)', border: '1px solid rgba(114,78,42,0.25)', borderRadius: '8px' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6rem', color: '#724E2A', whiteSpace: 'nowrap' }}>{t.details.from}:</span>
            <Input
              placeholder={t.details.fromPlaceholder}
              value={noteFrom}
              onChange={(e) => setNoteFrom(e.target.value)}
              className="flex-1 text-xs h-7"
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', background: 'rgba(237,226,194,0.6)', border: '1px solid rgba(114,78,42,0.25)', borderRadius: '8px' }}
            />
          </div>
        </div>

        {/* Price */}
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: "'Pouler', var(--font-serif)", fontSize: '2rem', color: '#FDAA5C', fontWeight: 400 }}>
            {price.toFixed(2)} EUR
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', marginTop: 'auto', paddingBottom: '1rem' }}>
          <button onClick={handleCustomize} style={{ ...btnBase, background: '#678F74', color: '#EDE2C2' }}>
            {t.details.customize}
          </button>
          <button onClick={handleAddToCart} style={{ ...btnBase, background: '#274324', color: '#F7D08D' }}>
            {t.navigation.addToCart}
            {cart.length > 0 && (
              <span style={{ marginLeft: '4px', background: '#FDAA5C', color: '#274324', borderRadius: '50%', padding: '0 5px', fontSize: '0.6rem' }}>
                {cart.length}
              </span>
            )}
          </button>
          <button onClick={() => setScreen("recommendations")} style={{ ...btnBase, background: 'transparent', color: '#678F74', border: '1.5px solid #678F74', flex: 0.7, borderRadius: '10px' }}>
            {t.details.chooseDifferent}
          </button>
        </div>
      </div>
    </ArchLayout>
  )
}
