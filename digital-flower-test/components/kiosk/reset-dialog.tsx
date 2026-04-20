"use client"

import { useKioskStore, translations } from "@/lib/kiosk-store"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ResetDialogProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ResetDialog({ open, onConfirm, onCancel }: ResetDialogProps) {
  const { language } = useKioskStore()
  const t = translations[language]

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            {t.dialogs.resetTitle}
          </DialogTitle>
          <DialogDescription className="text-lg mt-2">
            {t.dialogs.resetMessage}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4 mt-6">
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1 min-h-14 text-lg"
            onClick={onCancel}
          >
            {t.navigation.cancel}
          </Button>
          <Button 
            size="lg" 
            className="flex-1 min-h-14 text-lg"
            onClick={onConfirm}
          >
            {t.navigation.confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
