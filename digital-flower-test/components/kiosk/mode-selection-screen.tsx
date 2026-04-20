"use client"

import { useKioskStore, translations } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Home, Sparkles, Palette } from "lucide-react"

interface ModeSelectionScreenProps {
  onHomeClick: () => void
}

export function ModeSelectionScreen({ onHomeClick }: ModeSelectionScreenProps) {
  const { language, setMode, setScreen } = useKioskStore()
  const t = translations[language]

  const handleGuidedMode = () => {
    setMode("guided")
    setScreen("recipient")
  }

  const handleFreestyleMode = () => {
    setMode("freestyle")
    setScreen("freestyle")
  }

  return (
    <div className="h-full flex flex-col p-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={() => setScreen("welcome")}
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

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1 className="font-serif text-xl text-foreground text-center mb-6">
          {t.modeSelection.title}
        </h1>

        <div className="flex flex-row gap-3 w-full max-w-sm">
          {/* Guided Mode - Recommended */}
          <Card 
            className="cursor-pointer border-2 border-primary hover:shadow-lg transition-all relative overflow-hidden group flex-1"
            onClick={handleGuidedMode}
          >
            {/* Recommended badge */}
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-medium">
              {t.modeSelection.guided.recommended}
            </div>
            <CardHeader className="pt-8 pb-2 px-3">
              <div className="mb-2">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="font-serif text-base">
                {t.modeSelection.guided.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <CardDescription className="text-xs text-muted-foreground">
                {t.modeSelection.guided.description}
              </CardDescription>
            </CardContent>
          </Card>

          {/* Freestyle Mode */}
          <Card 
            className="cursor-pointer border-2 hover:border-primary hover:shadow-lg transition-all group flex-1"
            onClick={handleFreestyleMode}
          >
            <CardHeader className="pt-6 pb-2 px-3">
              <div className="mb-2">
                <Palette className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <CardTitle className="font-serif text-base">
                {t.modeSelection.freestyle.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <CardDescription className="text-xs text-muted-foreground">
                {t.modeSelection.freestyle.description}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
