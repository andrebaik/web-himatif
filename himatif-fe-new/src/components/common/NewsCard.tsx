import { Link } from 'react-router-dom'
import { Calendar, User } from '@phosphor-icons/react'
import type { Berita } from '@/types'
import { assetUrl } from '@/lib/utils'

interface NewsCardProps {
  berita: Berita
  featured?: boolean
}

export default function NewsCard({ berita, featured = false }: NewsCardProps) {
  const imageUrl = assetUrl(berita.image)

  if (featured) {
    return (
      <Link to={`/berita/${berita.slug}`} className="group block">
        <div className="relative rounded-2xl overflow-hidden min-h-[400px]">
          {imageUrl ? (
            <div className="absolute inset-0">
              <img
                src={imageUrl}
                alt={berita.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-transparent" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0c0c0c]" />
          )}
          <div className="relative z-10 flex flex-col justify-end h-full p-8">
            <p className="text-xs text-primary font-medium mb-2">{berita.category}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
              {berita.title}
            </h2>
            <p className="text-white/70 text-sm line-clamp-2 mb-4 max-w-xl">{berita.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1"><User size={12} />{berita.author}</span>
              <span className="flex items-center gap-1"><Calendar size={12} />{new Date(berita.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/berita/${berita.slug}`} className="group block">
      <div className="rounded-2xl bg-[#121212] border border-border/50 overflow-hidden transition-all duration-300 group-hover:border-orange-500/30 h-full">
        <div className="aspect-[16/10] overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={berita.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-[#333] text-sm">No image</span>
            </div>
          )}
        </div>
        <div className="p-5 space-y-2">
          <p className="text-xs text-primary font-medium">{berita.category}</p>
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {berita.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{berita.excerpt}</p>
          <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><User size={12} />{berita.author}</span>
            <span className="flex items-center gap-1"><Calendar size={12} />{new Date(berita.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
