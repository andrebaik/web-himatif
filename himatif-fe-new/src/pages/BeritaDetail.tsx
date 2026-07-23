import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, User } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getBeritaBySlugApi } from '@/api/berita.api'
import type { Berita } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { assetUrl } from '@/lib/utils'

export default function BeritaDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [berita, setBerita] = useState<Berita | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useDocumentTitle(berita?.title || 'Berita')

  useEffect(() => {
    if (!slug) return
    getBeritaBySlugApi(slug)
      .then((res) => {
        if (res.data) setBerita(res.data)
        else setError(true)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[500px] w-full rounded-2xl" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    )
  }

  if (error || !berita) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Berita Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-6">Berita yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Link to="/berita">
          <Button variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke Berita
          </Button>
        </Link>
      </div>
    )
  }

  const imageUrl = assetUrl(berita.image)

  return (
    <article className="mx-auto max-w-5xl px-4 py-12">
      <Link
        to="/berita"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 bg-[#121212] border border-border/50 rounded-full px-4 py-2"
      >
        <ArrowLeft size={16} />
        Kembali ke Berita
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
          {berita.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {berita.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {new Date(berita.date).toLocaleDateString('id-ID', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <User size={14} />
            {berita.author}
          </span>
        </div>
      </header>

      {imageUrl && (
        <div className="relative mb-10 rounded-2xl overflow-hidden">
          <img
            src={imageUrl}
            alt={berita.title}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/60 to-transparent" />
        </div>
      )}

      {berita.excerpt && (
        <p className="text-lg text-muted-foreground italic mb-8 border-l-4 border-primary pl-4">
          {berita.excerpt}
        </p>
      )}

      <div
        className="prose prose-invert prose-orange max-w-none
          prose-headings:text-foreground
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:text-orange-400 prose-code:bg-muted prose-code:px-1 prose-code:rounded
          prose-pre:bg-muted prose-pre:border prose-pre:border-border
          prose-blockquote:border-primary prose-blockquote:text-muted-foreground
          prose-li:text-muted-foreground
          prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: berita.content }}
      />
    </article>
  )
}
