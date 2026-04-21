"use client"

import { useKioskStore, translations } from "@/lib/kiosk-store"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface InactivityDialogProps {
  open: boolean
  onContinue: () => void
}

export function InactivityDialog({ open, onContinue }: InactivityDialogProps) {
  const { language } = useKioskStore()
  const t = translations[language]

  return (
    <Dialog open={open} onOpenChange={() => onContinue()}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl">
            {t.dialogs.stillThere}
          </DialogTitle>
          <DialogDescription className="text-xl mt-4">
            {t.dialogs.stillThereMessage}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
