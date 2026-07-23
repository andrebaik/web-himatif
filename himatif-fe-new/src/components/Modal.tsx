import { type ReactNode } from 'react'
import { Dialog } from '@/components/ui/dialog'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  clean?: boolean
}

export default function Modal({ isOpen, onClose, title, children, clean }: ModalProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={clean ? undefined : title}>
      {clean ? children : <div className="space-y-4">{children}</div>}
    </Dialog>
  )
}
