"use client"

import { useState, useEffect } from "react"
import { useKioskStore, translations, mainFlowers, fillerFlowers, greeneryOptions, wrappingOptions } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Home, Flower2, Leaf, Gift, FileText, Check, ShoppingCart } from "lucide-react"
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

  // Reset customization on mount for freestyle mode
  useEffect(() => {
    resetCustomization()
  }, [resetCustomization])

  // Calculate freestyle price
  const calculatePrice = () => {
    let price = 15 // Base price for freestyle

    // Main flower count adjustments
    if (customization.mainFlowerCount === 5) price += 5
    if (customization.mainFlowerCount === 7) price += 10

    // Filler flowers add cost
    if (customization.fillerFlower) price += 3

    // Greenery costs
    price += customization.greenery.length * 2

    // Premium wrapping
    if (customization.wrapping?.premium) {
      price += customization.wrapping.price
    }

    return price
  }

  const price = calculatePrice()

  const categories = [
    { id: 'main' as const, label: t.customization.mainFlowers, icon: Flower2 },
    { id: 'filler' as const, label: t.customization.fillerFlowers, icon: Flower2 },
    { id: 'greenery' as const, label: t.customization.greenery, icon: Leaf },
    { id: 'wrapping' as const, label: t.customization.wrapping, icon: Gift },
    { id: 'note' as const, label: t.customization.note, icon: FileText },
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

  const handleStartOver = () => {
    resetCustomization()
  }

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'main':
        return (
          <div>
            <p className="text-xs text-muted-foreground mb-3">{t.customization.mainFlowersDesc}</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {mainFlowers.map((flower) => (
                <Card
                  key={flower.id}
                  className={`cursor-pointer border transition-all ${
                    customization.mainFlower?.id === flower.id
                      ? 'border-primary ring-1 ring-primary/20'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => updateCustomization({ mainFlower: flower })}
                >
                  <CardContent className="p-2 text-center">
                    <div className="relative aspect-square mb-1 bg-muted rounded overflow-hidden">
                      <Image src={flower.image} alt={flower.name} fill className="object-cover" />
                      {customization.mainFlower?.id === flower.id && (
                        <div className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground rounded-full p-0.5">
                          <Check className="h-2 w-2" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium">{flower.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">{t.customization.count}</p>
              <div className="flex gap-2">
                {([3, 5, 7] as const).map((count) => (
                  <Button
                    key={count}
                    variant={customization.mainFlowerCount === count ? "default" : "outline"}
                    size="sm"
                    className="min-w-10 h-8"
                    onClick={() => updateCustomization({ mainFlowerCount: count })}
                  >
                    {count}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'filler':
        return (
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {fillerFlowers.map((flower) => (
                <Card
                  key={flower.id}
                  className={`cursor-pointer border transition-all ${
                    customization.fillerFlower?.id === flower.id
                      ? 'border-primary ring-1 ring-primary/20'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => updateCustomization({ fillerFlower: flower })}
                >
                  <CardContent className="p-2 text-center">
                    <div className="relative aspect-square mb-1 bg-muted rounded overflow-hidden">
                      <Image src={flower.image} alt={flower.name} fill className="object-cover" />
                      {customization.fillerFlower?.id === flower.id && (
                        <div className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground rounded-full p-0.5">
                          <Check className="h-2 w-2" />
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium">{flower.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'greenery':
        return (
          <div>
            <p className="text-xs text-muted-foreground mb-3">{t.customization.greeneryDesc}</p>
            <div className="grid grid-cols-3 gap-2">
              {greeneryOptions.map((green) => {
                const isSelected = customization.greenery.some(g => g.id === green.id)
                const canSelect = customization.greenery.length < 3 || isSelected
                
                return (
                  <Card
                    key={green.id}
                    className={`cursor-pointer border transition-all ${
                      isSelected
                        ? 'border-primary ring-1 ring-primary/20'
                        : canSelect 
                          ? 'hover:border-primary/50' 
                          : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (!canSelect) return
                      if (isSelected) {
                        updateCustomization({ 
                          greenery: customization.greenery.filter(g => g.id !== green.id) 
                        })
                      } else {
                        updateCustomization({ 
                          greenery: [...customization.greenery, green] 
                        })
                      }
                    }}
                  >
                    <CardContent className="p-2 text-center">
                      <div className="relative aspect-square mb-1 bg-muted rounded overflow-hidden">
                        <Image src={green.image} alt={green.name} fill className="object-cover" />
                        {isSelected && (
                          <div className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground rounded-full p-0.5">
                            <Check className="h-2 w-2" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-medium">{green.name}</span>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Selected: {customization.greenery.length}/3
            </p>
          </div>
        )

      case 'wrapping':
        return (
          <div className="grid grid-cols-3 gap-2">
            {wrappingOptions.map((wrap) => (
              <Card
                key={wrap.id}
                className={`cursor-pointer border transition-all ${
                  customization.wrapping?.id === wrap.id
                    ? 'border-primary ring-1 ring-primary/20'
                    : 'hover:border-primary/50'
                }`}
                onClick={() => updateCustomization({ wrapping: wrap })}
              >
                <CardContent className="p-2 text-center">
                  <div className="relative aspect-square mb-1 bg-muted rounded overflow-hidden">
                    <Image src={wrap.image} alt={wrap.name} fill className="object-cover" />
                    {customization.wrapping?.id === wrap.id && (
                      <div className="absolute top-0.5 right-0.5 bg-primary text-primary-foreground rounded-full p-0.5">
                        <Check className="h-2 w-2" />
                      </div>
                    )}
                    {wrap.premium && (
                      <div className="absolute bottom-0.5 left-0.5 bg-accent text-accent-foreground text-[10px] px-1 py-0.5 rounded">
                        +{wrap.price}€
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium">{wrap.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case 'note':
        return (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium mb-1 block">Message</label>
              <Textarea
                placeholder="Write your message here..."
                value={customization.noteMessage}
                onChange={(e) => updateCustomization({ noteMessage: e.target.value })}
                className="min-h-20 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium mb-1 block">From</label>
              <Input
                placeholder="Name or initials"
                value={customization.noteFrom}
                onChange={(e) => updateCustomization({ noteFrom: e.target.value })}
                className="text-sm h-8"
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="h-full flex flex-col p-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={() => setScreen("mode-selection")}
        >
          <ArrowLeft className="h-4 w-4" />
          {t.navigation.back}
        </Button>
        <h1 className="font-serif text-base">{t.modeSelection.freestyle.title}</h1>
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

      {/* Main layout with left sidebar */}
      <div className="flex-1 flex gap-2 min-h-0 overflow-hidden mb-3">
        {/* Category tabs - vertical sidebar */}
        <div className="flex flex-col gap-1 overflow-y-auto pb-1 shrink-0 w-28">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                className="shrink-0 text-[10px] h-7 gap-1 px-2 justify-start"
                onClick={() => setActiveCategory(cat.id)}
              >
                <Icon className="h-3 w-3 shrink-0" />
                <span className="truncate">{cat.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Main content - scrollable */}
        <div className="flex-1 overflow-auto">
          <Card>
            <CardHeader className="pb-2 px-3 pt-3">
              <CardTitle className="font-serif text-sm">
                {categories.find(c => c.id === activeCategory)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              {renderCategoryContent()}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Preview and price bar */}
      <Card className="mb-3 max-w-xs mx-auto w-full">
        <CardContent className="p-3 flex items-center gap-3">
          <div className="relative h-10 w-10 bg-muted rounded overflow-hidden shrink-0 flex items-center justify-center">
            <Flower2 className="h-5 w-5 text-primary/30" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-xs truncate">Custom Bouquet</h3>
            <p className="text-[10px] text-muted-foreground truncate">
              {customization.mainFlower?.name || 'Select flowers'} 
              {customization.mainFlower && ` x${customization.mainFlowerCount}`}
            </p>
          </div>
          <p className="text-base font-semibold text-primary shrink-0">{price.toFixed(2)} EUR</p>
        </CardContent>
      </Card>

      {/* Action buttons - horizontal layout */}
      <div className="flex gap-2 max-w-xs mx-auto w-full">
        <Button
          size="sm"
          className="flex-1 h-8 text-xs gap-1"
          onClick={handleAddToCart}
          disabled={!customization.mainFlower}
        >
          <ShoppingCart className="h-4 w-4" />
          {t.navigation.addToCart}
        </Button>
        <div className="flex gap-2 flex-1">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-[10px]"
            onClick={handleStartOver}
          >
            {t.customization.startOver}
          </Button>
          {cart.length > 0 && (
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 h-8 text-[10px]"
              onClick={() => setScreen("cart")}
            >
              {t.navigation.viewCart} ({cart.length})
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
