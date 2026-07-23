import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const Separator = forwardRef<HTMLHRElement, HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <hr
      ref={ref}
      className={cn('shrink-0 bg-border border-0 h-px w-full', className)}
      {...props}
    />
  )
)
Separator.displayName = 'Separator'

export { Separator }
