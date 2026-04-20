"use client"

import { useKioskStore, translations } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Flower2 } from "lucide-react"

export function WelcomeScreen() {
  const { language, setLanguage, setScreen } = useKioskStore()
  const t = translations[language]

  const handleLanguageSelect = (lang: 'en' | 'hr') => {
    setLanguage(lang)
    setScreen("mode-selection")
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-background to-muted/30">
      {/* Decorative flower icon */}
      <div className="mb-8">
        <Flower2 className="h-20 w-20 text-primary" strokeWidth={1} />
      </div>

      {/* Title */}
      <h1 className="font-serif text-2xl text-foreground text-center mb-5 text-balance">
        {t.welcome.title}
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-muted-foreground text-center px-6 mb-4 text-pretty">
        {t.welcome.subtitle}
      </p>

      {/* Tagline */}
      <p className="text-xs text-primary font-medium mb-12 italic">
        {t.welcome.tagline}
      </p>

      {/* Language selection */}
      <div className="flex flex-row gap-4 w-full max-w-xs">
        <Button
          variant="outline"
          size="lg"
          className="h-16 flex-1 text-xs border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          onClick={() => handleLanguageSelect("en")}
        >
          English
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-16 flex-1 text-xs border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          onClick={() => handleLanguageSelect("hr")}
        >
          Hrvatski
        </Button>
      </div>
    </div>
  )
}
