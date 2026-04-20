"use client"

import { useEffect, useState } from "react"
import { useKioskStore, translations } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Flower2 } from "lucide-react"

export function ConfirmationScreen() {
  const { language, orderNumber, resetSession, clearCart } = useKioskStore()
  const t = translations[language]
  
  const [displayOrderNumber] = useState(() => 
    orderNumber || `#${Math.floor(Math.random() * 900) + 100}`
  )

  // Auto-reset after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart()
      resetSession()
    }, 30000)

    return () => clearTimeout(timer)
  }, [clearCart, resetSession])

  const handleNewOrder = () => {
    clearCart()
    resetSession()
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-background p-4">
      {/* Success animation */}
      <div className="mb-5">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <Check className="h-7 w-7 text-primary-foreground" strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Confirmation message */}
      <h1 className="mb-3 text-center font-serif text-xl text-foreground">
        {t.confirmation.title}
      </h1>

      {/* Order number */}
      <Card className="mb-5 w-full max-w-xs">
        <CardContent className="p-3 text-center">
          <p className="mb-1 text-xs text-muted-foreground">{t.confirmation.orderNumber}</p>
          <p className="font-serif text-3xl font-bold text-primary">{displayOrderNumber}</p>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="mb-5 flex flex-col items-center gap-3 text-center px-4 max-w-xs">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
          <Flower2 className="h-4 w-4 text-primary" strokeWidth={1.5} />
        </div>
        <p className="text-xs text-foreground">
          {t.confirmation.message}
        </p>
        <p className="text-[10px] text-muted-foreground">
          {t.confirmation.estimatedTime} <strong>{t.confirmation.timeRange}</strong>
        </p>
        <p className="text-[10px] text-muted-foreground">
          {t.confirmation.contactMessage}
        </p>
      </div>

      {/* New order button */}
      <Button size="sm" className="h-9 min-w-32 text-xs" onClick={handleNewOrder}>
        {t.confirmation.newOrder}
      </Button>

      {/* Auto-reset notice */}
      <p className="mt-4 text-[10px] text-muted-foreground">
        This screen will automatically reset in 30 seconds
      </p>
    </div>
  )
}
