"use client"

import { useEffect, useState, useCallback } from "react"
import { useKioskStore } from "@/lib/kiosk-store"
import { KioskFrame } from "./kiosk-frame"
import { WelcomeScreen } from "./welcome-screen"
import { ModeSelectionScreen } from "./mode-selection-screen"
import { RecipientScreen } from "./recipient-screen"
import { OccasionScreen } from "./occasion-screen"
import { RecommendationsScreen } from "./recommendations-screen"
import { BouquetDetailsScreen } from "./bouquet-details-screen"
import { CustomizationScreen } from "./customization-screen"
import { FreestyleScreen } from "./freestyle-screen"
import { CartScreen } from "./cart-screen"
import { PaymentScreen } from "./payment-screen"
import { ConfirmationScreen } from "./confirmation-screen"
import { InactivityDialog } from "./inactivity-dialog"
import { ResetDialog } from "./reset-dialog"

export function Kiosk() {
  const { screen, lastInteraction, resetSession, updateInteraction } = useKioskStore()
  const [showInactivityDialog, setShowInactivityDialog] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)

  // Handle session timeout
  useEffect(() => {
    if (screen === 'welcome' || screen === 'confirmation') return

    const checkInactivity = setInterval(() => {
      const elapsed = Date.now() - lastInteraction
      
      if (elapsed >= 30000 && !showInactivityDialog) {
        setShowInactivityDialog(true)
      }
      
      if (elapsed >= 50000) {
        setShowInactivityDialog(false)
        resetSession()
      }
    }, 1000)

    return () => clearInterval(checkInactivity)
  }, [screen, lastInteraction, showInactivityDialog, resetSession])

  const handleContinue = useCallback(() => {
    setShowInactivityDialog(false)
    updateInteraction()
  }, [updateInteraction])

  const handleHomeClick = useCallback(() => {
    if (screen !== 'welcome') {
      setShowResetDialog(true)
    }
  }, [screen])

  const handleResetConfirm = useCallback(() => {
    setShowResetDialog(false)
    resetSession()
  }, [resetSession])

  const handleResetCancel = useCallback(() => {
    setShowResetDialog(false)
    updateInteraction()
  }, [updateInteraction])

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen />
      case 'mode-selection':
        return <ModeSelectionScreen onHomeClick={handleHomeClick} />
      case 'recipient':
        return <RecipientScreen onHomeClick={handleHomeClick} />
      case 'occasion':
        return <OccasionScreen onHomeClick={handleHomeClick} />
      case 'recommendations':
        return <RecommendationsScreen onHomeClick={handleHomeClick} />
      case 'bouquet-details':
        return <BouquetDetailsScreen onHomeClick={handleHomeClick} />
      case 'customization':
      case 'customization-main-flowers':
      case 'customization-filler-flowers':
      case 'customization-greenery':
      case 'customization-wrapping':
      case 'customization-note':
        return <CustomizationScreen onHomeClick={handleHomeClick} />
      case 'freestyle':
        return <FreestyleScreen onHomeClick={handleHomeClick} />
      case 'cart':
        return <CartScreen onHomeClick={handleHomeClick} />
      case 'payment':
      case 'payment-card':
      case 'payment-cash':
        return <PaymentScreen onHomeClick={handleHomeClick} />
      case 'confirmation':
        return <ConfirmationScreen />
      default:
        return <WelcomeScreen />
    }
  }

  return (
    <KioskFrame>
      <div 
        className="h-full bg-background"
        onClick={() => showInactivityDialog && handleContinue()}
      >
        {renderScreen()}
        
        <InactivityDialog 
          open={showInactivityDialog} 
          onContinue={handleContinue} 
        />
        
        <ResetDialog 
          open={showResetDialog}
          onConfirm={handleResetConfirm}
          onCancel={handleResetCancel}
        />
      </div>
    </KioskFrame>
  )
}
