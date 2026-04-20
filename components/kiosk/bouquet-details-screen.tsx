"use client"

import { useState } from "react"
import { useKioskStore, translations, calculateBouquetPrice, mainFlowers, fillerFlowers, greeneryOptions, wrappingOptions } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Home, ShoppingCart, Palette, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
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
    // Update note in customization
    updateCustomization({ noteMessage, noteFrom })
    
    // Create cart item
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
    // Initialize customization with default values if not set
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

  return (
    <div className="h-full flex flex-col p-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={() => setScreen("recommendations")}
        >
          <ArrowLeft className="h-4 w-4" />
          {t.navigation.back}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={onHomeClick}
        >
          <Home className="h-4 w-4" />
          {t.navigation.home}
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="w-full mb-3 px-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground">Step 4 of 4</span>
        </div>
        <Progress value={100} className="h-1" />
      </div>

      {/* Content - Vertical layout for narrow screen */}
      <div className="flex-1 flex flex-col w-full overflow-auto items-center">
        {/* Bouquet Image */}
        <Card className="overflow-hidden mb-3 w-full max-w-xs">
          <div className="relative aspect-[4/3] bg-muted">
            <Image
              src={selectedBouquet.image}
              alt={selectedBouquet.name}
              fill
              className="object-cover"
            />
          </div>
        </Card>

        {/* Details */}
        <div className="flex-1 flex flex-col w-full max-w-xs">
          <div className="mb-3 text-center">
            <h1 className="font-serif text-lg text-foreground mb-1">
              {selectedBouquet.name}
            </h1>
            <p className="text-xs text-muted-foreground mb-1">
              {selectedBouquet.description}
            </p>
            <p className="text-xs">
              <span className="font-medium">{t.details.color}:</span>{" "}
              <span className="text-muted-foreground">{selectedBouquet.color}</span>
            </p>
          </div>

          {/* Message section */}
          <Card className="mb-3">
            <CardContent className="p-3">
              <h3 className="font-medium text-xs mb-2">{t.details.message}</h3>
              <Textarea
                placeholder={t.details.messagePlaceholder}
                value={noteMessage}
                onChange={(e) => setNoteMessage(e.target.value)}
                className="min-h-16 mb-2 text-xs"
              />
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">{t.details.from}:</span>
                <Input
                  placeholder={t.details.fromPlaceholder}
                  value={noteFrom}
                  onChange={(e) => setNoteFrom(e.target.value)}
                  className="flex-1 text-xs h-8"
                />
              </div>
            </CardContent>
          </Card>

          {/* Price */}
          <div className="mb-3 text-center">
            <span className="text-lg font-serif font-semibold text-primary">
              {price.toFixed(2)} EUR
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row gap-1.5 mt-auto w-full justify-center">
            <Button
              size="sm"
              className="h-8 text-[10px] gap-1 px-2 whitespace-nowrap"
              onClick={handleCustomize}
            >
              <Palette className="h-3 w-3 shrink-0" />
              {t.details.customize}
            </Button>
            
            <Button
              size="sm"
              variant="default"
              className="h-8 text-[10px] gap-1 px-2 bg-primary whitespace-nowrap"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3 w-3 shrink-0" />
              {t.navigation.addToCart}
              {cart.length > 0 && (
                <span className="ml-1 bg-primary-foreground text-primary px-1 py-0.5 rounded-full text-[9px]">
                  {cart.length}
                </span>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="h-8 text-[10px] gap-1 px-2 whitespace-nowrap"
              onClick={() => setScreen("recommendations")}
            >
              <RefreshCw className="h-3 w-3 shrink-0" />
              {t.details.chooseDifferent}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
