import type { Icon } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: Icon
  title: string
  description: string
  children?: ReactNode
  className?: string
  variant?: 'default' | 'large' | 'wide'
}

export default function FeatureCard({ icon: Icon, title, description, children, className, variant = 'default' }: FeatureCardProps) {
  return (
    <div className={cn(
      'group relative rounded-2xl bg-[#121212] border border-border/50 p-6 transition-all duration-500 hover:border-orange-500/30',
      variant === 'large' && 'p-8',
      variant === 'wide' && 'p-8',
      className
    )}>
      <div className="relative z-10">
        <div className={cn(
          'inline-flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-4',
          variant === 'large' ? 'w-14 h-14' : 'w-12 h-12'
        )}>
          <Icon size={variant === 'large' ? 28 : 24} />
        </div>
        <h3 className={cn('font-semibold text-foreground mb-2', variant === 'large' && 'text-xl')}>{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  )
}
