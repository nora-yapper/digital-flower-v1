"use client"

import { useKioskStore, translations } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home, Trash2, Plus, Minus, Flower2, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface CartScreenProps {
  onHomeClick: () => void
}

export function CartScreen({ onHomeClick }: CartScreenProps) {
  const { 
    language, 
    mode,
    cart, 
    removeFromCart, 
    updateCartItemQuantity,
    clearCart, 
    setScreen 
  } = useKioskStore()
  const t = translations[language]

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0)
  }

  const handleBack = () => {
    if (mode === "guided") {
      setScreen("bouquet-details")
    } else {
      setScreen("freestyle")
    }
  }

  const handleAddAnother = () => {
    setScreen("mode-selection")
  }

  return (
    <div className="h-full flex flex-col p-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-xs"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          {t.navigation.back}
        </Button>
        <h1 className="font-serif text-base">{t.cart.title}</h1>
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

      {/* Main content - vertical layout */}
      <div className="flex-1 flex flex-col w-full overflow-auto items-center">
        {cart.length === 0 ? (
          <Card className="p-6 text-center flex-1 flex flex-col items-center justify-center w-full max-w-xs">
            <ShoppingCart className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" strokeWidth={1} />
            <h2 className="mb-2 font-serif text-base text-foreground">
              {t.cart.empty}
            </h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Add some beautiful flowers to get started
            </p>
            <Button size="sm" className="h-8 text-xs" onClick={() => setScreen("mode-selection")}>
              Start Shopping
            </Button>
          </Card>
        ) : (
          <div className="w-full max-w-xs flex flex-col flex-1">
            {/* Cart items */}
            <div className="space-y-3 mb-3">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex items-start gap-3 p-3">
                    {/* Bouquet image */}
                    <div className="relative h-14 w-14 shrink-0 rounded-md bg-muted overflow-hidden">
                      <Image
                        src={item.bouquet.image}
                        alt={item.bouquet.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xs text-foreground truncate">
                        {item.bouquet.name}
                      </h3>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {item.customization.mainFlower?.name} x{item.customization.mainFlowerCount}
                      </p>
                      
                      {/* Quantity controls inline */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateCartItemQuantity(item.id, item.quantity - 1)
                            }
                          }}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Price and remove */}
                    <div className="text-right shrink-0">
                      <p className="font-serif text-xs font-semibold text-primary">
                        {(item.totalPrice * item.quantity).toFixed(2)} EUR
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive h-6 px-1 text-[10px] mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add more items button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full h-8 gap-1 text-xs"
                onClick={handleAddAnother}
              >
                <Plus className="h-3 w-3" />
                {t.cart.addAnother}
              </Button>
            </div>

            {/* Order summary */}
            <Card className="mt-auto">
              <CardContent className="p-3">
                <div className="mb-3 space-y-1">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground truncate mr-2">
                        {item.bouquet.name} x{item.quantity}
                      </span>
                      <span className="shrink-0">{(item.totalPrice * item.quantity).toFixed(2)} EUR</span>
                    </div>
                  ))}
                </div>

                <div className="mb-3 border-t border-border pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium">{t.cart.total}</span>
                    <span className="font-serif text-lg font-semibold text-primary">
                      {calculateTotal().toFixed(2)} EUR
                    </span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="mb-2 w-full h-8 text-xs"
                  onClick={() => setScreen("payment")}
                >
                  {t.cart.checkout}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full h-7 text-[10px] text-destructive hover:text-destructive"
                  onClick={clearCart}
                >
                  {t.cart.cancelOrder}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
