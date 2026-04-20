"use client"

import { useKioskStore, translations, type Recipient } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home, Heart, Users, UserRound, Cross } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface RecipientScreenProps {
  onHomeClick: () => void
}

const recipientIcons: Record<Recipient, React.ReactNode> = {
  lover: <Heart className="h-6 w-6" />,
  friend: <UserRound className="h-6 w-6" />,
  family: <Users className="h-6 w-6" />,
  deceased: <Cross className="h-6 w-6" />,
}

export function RecipientScreen({ onHomeClick }: RecipientScreenProps) {
  const { language, setRecipient, setScreen } = useKioskStore()
  const t = translations[language]

  const recipients: { id: Recipient; label: string }[] = [
    { id: 'lover', label: t.recipients.lover },
    { id: 'friend', label: t.recipients.friend },
    { id: 'family', label: t.recipients.family },
    { id: 'deceased', label: t.recipients.deceased },
  ]

  const handleSelect = (recipient: Recipient) => {
    setRecipient(recipient)
    setScreen("occasion")
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
          <span className="text-[10px] text-muted-foreground">Step 1 of 4</span>
        </div>
        <Progress value={25} className="h-1" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-2">
        <h1 className="font-serif text-lg text-foreground text-center mb-5">
          {t.recipients.title}
        </h1>

        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          {recipients.map((recipient) => (
            <Card
              key={recipient.id}
              className="cursor-pointer border hover:border-primary hover:shadow-md transition-all group"
              onClick={() => handleSelect(recipient.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-3 text-center">
                <div className="mb-2 text-muted-foreground group-hover:text-primary transition-colors">
                  {recipientIcons[recipient.id]}
                </div>
                <h2 className="font-serif text-sm text-foreground">
                  {recipient.label}
                </h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
