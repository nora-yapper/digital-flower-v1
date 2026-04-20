"use client"

import { useKioskStore, translations, type Occasion } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home, Heart, CalendarHeart, PartyPopper, Church } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface OccasionScreenProps {
  onHomeClick: () => void
}

const occasionIcons: Record<Occasion, React.ReactNode> = {
  valentine: <Heart className="h-6 w-6" />,
  anniversary: <CalendarHeart className="h-6 w-6" />,
  platonic: <PartyPopper className="h-6 w-6" />,
  sacrament: <Church className="h-6 w-6" />,
}

// Occasions disabled for deceased recipient
const disabledForDeceased: Occasion[] = ['valentine', 'anniversary']

export function OccasionScreen({ onHomeClick }: OccasionScreenProps) {
  const { language, recipient, setOccasion, setScreen } = useKioskStore()
  const t = translations[language]

  const occasions: { id: Occasion; label: string }[] = [
    { id: 'valentine', label: t.occasions.valentine },
    { id: 'anniversary', label: t.occasions.anniversary },
    { id: 'platonic', label: t.occasions.platonic },
    { id: 'sacrament', label: t.occasions.sacrament },
  ]

  const isDisabled = (occasionId: Occasion): boolean => {
    if (recipient === 'deceased' && disabledForDeceased.includes(occasionId)) {
      return true
    }
    return false
  }

  const handleSelect = (occasion: Occasion) => {
    if (isDisabled(occasion)) return
    setOccasion(occasion)
    setScreen("recommendations")
  }

  return (
    <div className="h-full flex flex-col p-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={() => setScreen("recipient")}
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
      <div className="w-full mb-4 px-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-muted-foreground">Step 2 of 4</span>
        </div>
        <Progress value={50} className="h-1" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-2">
        <h1 className="font-serif text-lg text-foreground text-center mb-5">
          {t.occasions.title}
        </h1>

        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          {occasions.map((occasion) => {
            const disabled = isDisabled(occasion.id)
            return (
              <Card
                key={occasion.id}
                className={`border transition-all ${
                  disabled 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'cursor-pointer hover:border-primary hover:shadow-md group'
                }`}
                onClick={() => handleSelect(occasion.id)}
              >
                <CardContent className="flex flex-col items-center justify-center p-3 text-center">
                  <div className={`mb-2 transition-colors ${
                    disabled ? 'text-muted-foreground/50' : 'text-muted-foreground group-hover:text-primary'
                  }`}>
                    {occasionIcons[occasion.id]}
                  </div>
                  <h2 className="font-serif text-sm text-foreground">
                    {occasion.label}
                  </h2>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
