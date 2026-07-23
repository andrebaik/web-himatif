import { Warning, WarningCircle, Info } from '@phosphor-icons/react'
import { Dialog } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  variant?: 'danger' | 'warning' | 'default'
  confirmLabel?: string
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  variant = 'default',
  confirmLabel = 'Konfirmasi',
}: ConfirmDialogProps) {
  const iconMap = {
    danger: <WarningCircle size={24} className="text-destructive-foreground" />,
    warning: <Warning size={24} className="text-yellow-400" />,
    default: <Info size={24} className="text-primary" />,
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          {iconMap[variant]}
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'default'}
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
