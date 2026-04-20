"use client"

import { useState } from "react"
import { useKioskStore, translations } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Home, CreditCard, Banknote, Loader2 } from "lucide-react"

interface PaymentScreenProps {
  onHomeClick: () => void
}

export function PaymentScreen({ onHomeClick }: PaymentScreenProps) {
  const { 
    language, 
    screen,
    cart, 
    paymentMethod,
    customerName,
    customerPhone,
    setPaymentMethod,
    setCustomerName,
    setCustomerPhone,
    setOrderNumber,
    setScreen 
  } = useKioskStore()
  const t = translations[language]
  
  const [isProcessing, setIsProcessing] = useState(false)

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0)
  }

  const handlePayment = () => {
    if (!paymentMethod) return
    if (paymentMethod === 'cash' && (!customerName || !customerPhone)) return

    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Generate order number
      const orderNum = `#${Math.floor(Math.random() * 900) + 100}`
      setOrderNumber(orderNum)
      setScreen("confirmation")
    }, 2000)
  }

  // Determine which sub-screen we're on
  const showMethodSelection = screen === 'payment'
  const showCardInstructions = screen === 'payment-card'
  const showCashForm = screen === 'payment-cash'

  return (
    <div className="h-full flex flex-col p-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={() => {
            if (showCardInstructions || showCashForm) {
              setScreen("payment")
            } else {
              setScreen("cart")
            }
          }}
          disabled={isProcessing}
        >
          <ArrowLeft className="h-4 w-4" />
          {t.navigation.back}
        </Button>
        <h1 className="font-serif text-base">{t.payment.title}</h1>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={onHomeClick}
          disabled={isProcessing}
        >
          <Home className="h-4 w-4" />
          {t.navigation.home}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full overflow-auto">
        {/* Order total */}
        <Card className="mb-4 w-full max-w-xs">
          <CardContent className="p-3 text-center">
            <p className="mb-1 text-xs text-muted-foreground">{t.payment.total}</p>
            <p className="font-serif text-2xl font-semibold text-primary">
              {calculateTotal().toFixed(2)} EUR
            </p>
          </CardContent>
        </Card>

        {/* Payment method selection */}
        {showMethodSelection && (
          <div className="w-full max-w-xs">
            <h2 className="mb-3 text-center font-serif text-base">
              {t.payment.paymentMethod}
            </h2>

            <div className="mb-4 grid grid-cols-2 gap-3 w-full">
              {/* Card payment */}
              <Card
                className={`cursor-pointer transition-all border ${
                  paymentMethod === "card"
                    ? "border-primary ring-1 ring-primary/20"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                <CardContent className="flex flex-col items-center p-3 text-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                      paymentMethod === "card"
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <CreditCard className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-sm">{t.payment.card}</h3>
                </CardContent>
              </Card>

              {/* Cash payment */}
              <Card
                className={`cursor-pointer transition-all border ${
                  paymentMethod === "cash"
                    ? "border-primary ring-1 ring-primary/20"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setPaymentMethod("cash")}
              >
                <CardContent className="flex flex-col items-center p-3 text-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                      paymentMethod === "cash"
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Banknote className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-sm">{t.payment.cash}</h3>
                </CardContent>
              </Card>
            </div>

            <Button
              size="sm"
              className="w-full h-9 text-xs"
              disabled={!paymentMethod}
              onClick={() => {
                if (paymentMethod === 'card') {
                  setScreen("payment-card")
                } else {
                  setScreen("payment-cash")
                }
              }}
            >
              {t.navigation.next}
            </Button>
          </div>
        )}

        {/* Card payment instructions */}
        {showCardInstructions && (
          <div className="w-full max-w-xs">
            <Card className="mb-4 w-full border-primary/20 bg-primary/5">
              <CardContent className="p-4 text-center">
                <CreditCard className="mx-auto mb-3 h-10 w-10 text-primary" />
                <p className="text-xs text-foreground">
                  {t.payment.cardInstructions}
                </p>
              </CardContent>
            </Card>

            <Button
              size="sm"
              className="w-full h-9 text-xs"
              disabled={isProcessing}
              onClick={handlePayment}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                t.payment.placeOrder
              )}
            </Button>
          </div>
        )}

        {/* Cash payment form */}
        {showCashForm && (
          <div className="w-full max-w-xs">
            <Card className="mb-4 w-full">
              <CardContent className="p-3 space-y-3">
                <div>
                  <label className="text-[10px] font-medium mb-1 block">
                    {t.payment.cashName}
                  </label>
                  <Input
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium mb-1 block">
                    {t.payment.cashPhone}
                  </label>
                  <Input
                    placeholder="Enter your phone number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="text-xs h-9"
                    type="tel"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              size="sm"
              className="w-full h-9 text-xs"
              disabled={isProcessing || !customerName || !customerPhone}
              onClick={handlePayment}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                t.payment.placeOrder
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
