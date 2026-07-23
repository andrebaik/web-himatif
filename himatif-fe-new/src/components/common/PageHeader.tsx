import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: ReactNode
}

export default function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <section className={cn('pt-28 pb-12 md:pt-36 md:pb-16', className)}>
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
