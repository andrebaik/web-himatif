import { useEffect, useState } from 'react'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import NewsCard from '@/components/common/NewsCard'
import { getAllBeritaApi } from '@/api/berita.api'
import type { Berita } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function BeritaPage() {
  useDocumentTitle('Berita')
  const [berita, setBerita] = useState<Berita[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllBeritaApi()
      .then((res) => {
        if (res.data) setBerita(res.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = [...new Set(berita.map((b) => b.category))]

  const filtered = berita.filter((b) => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !category || b.category === category
    return matchSearch && matchCategory
  })

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Berita
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Ikuti perkembangan dan informasi terbaru dari HIMATIF ITG.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  !category ? 'bg-primary text-white' : 'bg-[#121212] text-muted-foreground border border-border/50 hover:border-primary/50'
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    category === cat ? 'bg-primary text-white' : 'bg-[#121212] text-muted-foreground border border-border/50 hover:border-primary/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="ml-auto">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-[#121212] border border-border/50 rounded-full px-4 py-2">
                  <MagnifyingGlass size={16} className="text-muted-foreground" />
                  <input
                    placeholder="Cari berita..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent text-sm text-foreground outline-none w-48"
                    autoFocus
                  />
                  <button onClick={() => { setSearchOpen(false); setSearch('') }} className="text-muted-foreground hover:text-foreground">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="w-10 h-10 rounded-full bg-[#121212] border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-300"
                >
                  <MagnifyingGlass size={16} />
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-20">Memuat berita...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">Tidak ada berita ditemukan.</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="space-y-8"
            >
              {featured && <NewsCard berita={featured} featured />}
              <div className="grid md:grid-cols-2 gap-6">
                {rest.map((item) => (
                  <NewsCard key={item.id} berita={item} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
