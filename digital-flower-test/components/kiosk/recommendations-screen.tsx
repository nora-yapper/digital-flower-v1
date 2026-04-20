"use client"

import { useKioskStore, translations, sampleBouquets, type Bouquet } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface RecommendationsScreenProps {
  onHomeClick: () => void
}

export function RecommendationsScreen({ onHomeClick }: RecommendationsScreenProps) {
  const { language, recipient, occasion, setSelectedBouquet, setScreen } = useKioskStore()
  const t = translations[language]

  // Filter bouquets based on recipient and occasion
  const filteredBouquets = sampleBouquets.filter((bouquet) => {
    if (!recipient || !occasion) return false
    return bouquet.recipients.includes(recipient) && bouquet.occasions.includes(occasion)
  })

  // Take first 9 bouquets for 3x3 grid
  const displayBouquets = filteredBouquets.slice(0, 9)

  const handleSelectBouquet = (bouquet: Bouquet) => {
    setSelectedBouquet(bouquet)
    setScreen("bouquet-details")
  }

  return (
    <div className="h-full flex flex-col p-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={() => setScreen("occasion")}
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
          <span className="text-[10px] text-muted-foreground">Step 3 of 4</span>
        </div>
        <Progress value={75} className="h-1" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center w-full overflow-auto px-2">
        <h1 className="font-serif text-lg text-foreground text-center mb-1">
          {t.recommendations.title}
        </h1>
        <p className="text-xs text-muted-foreground text-center mb-4">
          {t.recommendations.subtitle}
        </p>

        {/* 3x3 Bouquet Grid */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
          {displayBouquets.map((bouquet) => (
            <Card
              key={bouquet.id}
              className="cursor-pointer border hover:border-primary hover:shadow-md transition-all group overflow-hidden"
              onClick={() => handleSelectBouquet(bouquet)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted">
                  <Image
                    src={bouquet.image}
                    alt={bouquet.name}
                    fill
                    className="object-cover"
                  />
                  {/* Price indicator badge */}
                  <div className="absolute top-0.5 right-0.5 bg-background/90 px-1 py-0.5 rounded text-[10px] font-medium">
                    {bouquet.priceIndicator}
                  </div>
                </div>
                <div className="p-1 text-center">
                  <h3 className="font-serif text-[10px] text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {bouquet.name}
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* If no bouquets found */}
        {displayBouquets.length === 0 && (
          <div className="text-center py-6">
            <p className="text-muted-foreground text-xs">
              No bouquets found for this selection. Please try different options.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 text-xs"
              onClick={() => setScreen("recipient")}
            >
              Start Over
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
