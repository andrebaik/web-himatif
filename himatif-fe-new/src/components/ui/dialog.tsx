import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  variant?: 'centered' | 'slide-right' | 'fullscreen'
}

export function Dialog({ isOpen, onClose, children, title, variant = 'centered' }: DialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isSlide = variant === 'slide-right'
  const isFullscreen = variant === 'fullscreen'

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />
          {isFullscreen ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              className="relative z-10 w-full max-w-4xl mx-4"
            >
              {children}
            </motion.div>
          ) : (
            <motion.div
              initial={isSlide ? { x: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={isSlide ? { x: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isSlide ? { x: '100%' } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className={cn(
                'relative z-10 bg-[#121212] border border-border shadow-2xl',
                isSlide
                  ? 'fixed right-0 top-0 h-full w-full max-w-lg overflow-y-auto'
                  : 'w-full max-w-lg rounded-2xl mx-4 p-6'
              )}
            >
              <div className="flex items-center justify-between mb-4">
                {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
                <button
                  onClick={onClose}
                  className={cn(
                    'rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors',
                    !title && 'ml-auto'
                  )}
                >
                  <X size={20} />
                </button>
              </div>
              {children}
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  )
}
