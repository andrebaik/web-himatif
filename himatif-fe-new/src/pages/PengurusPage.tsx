import { useEffect, useState } from 'react'
import { InstagramLogo, LinkedinLogo, GithubLogo } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import PengurusCard from '@/components/common/PengurusCard'
import { getAllPengurusApi } from '@/api/pengurus.api'
import type { Pengurus } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { assetUrl } from '@/lib/utils'

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-1 h-6 rounded-full bg-primary" />
      <h2 className="text-xl font-bold text-foreground tracking-tight">{title}</h2>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
}

export default function PengurusPage() {
  useDocumentTitle('Struktur Pengurus')
  const [pengurus, setPengurus] = useState<Pengurus[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<Pengurus | null>(null)

  useEffect(() => {
    getAllPengurusApi()
      .then((res) => {
        if (res.data) setPengurus(res.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const pimpinan = pengurus
    .filter(p => {
      const j = p.jabatan.toLowerCase()
      return j.includes('ketua') || j.includes('bendahara umum') || j.includes('sekretaris umum') || j.includes('sekertaris umum')
    })
    .sort((a, b) => {
      const rank: Record<string, number> = {
        'ketua': 1, 'wakil ketua': 2,
        'bendahara umum': 3, 'sekretaris umum': 4, 'sekertaris umum': 4,
      }
      const ar = Object.entries(rank).find(([k]) => a.jabatan.toLowerCase().includes(k))
      const br = Object.entries(rank).find(([k]) => b.jabatan.toLowerCase().includes(k))
      return (ar?.[1] ?? 99) - (br?.[1] ?? 99)
    })

  const specialRoles = ['bendahara umum', 'sekretaris umum', 'sekertaris umum', 'staff bendahara', 'staff sekretaris', 'staff sekertaris']
  const bendaharaSekretaris = pengurus
    .filter(p => specialRoles.some(r => p.jabatan.toLowerCase().includes(r)))
    .sort((a, b) => {
      const rank: Record<string, number> = {
        'bendahara umum': 1, 'sekretaris umum': 2, 'sekertaris umum': 2,
        'staff bendahara': 3, 'staff sekretaris': 4, 'staff sekertaris': 4,
      }
      const ar = Object.entries(rank).find(([k]) => a.jabatan.toLowerCase().includes(k))
      const br = Object.entries(rank).find(([k]) => b.jabatan.toLowerCase().includes(k))
      return (ar?.[1] ?? 99) - (br?.[1] ?? 99)
    })

  const groupedPengurus: Record<string, Pengurus[]> = {}
  pengurus.forEach(p => {
    if (!p.nama_divisi) return
    const divisi = p.nama_divisi
    if (!groupedPengurus[divisi]) groupedPengurus[divisi] = []
    groupedPengurus[divisi].push(p)
  })

  Object.values(groupedPengurus).forEach(members => {
    members.sort((a, b) => {
      const getRank = (p: Pengurus) => {
        const j = p.jabatan.toLowerCase()
        if (j.includes('ketua divisi')) return 1
        if (j.includes('ketua sub')) return 2
        return 3
      }
      return getRank(a) - getRank(b)
    })
  })

  const divisiOrder = [
    'Divisi Teknologi Informasi',
    'Divisi Pendidikan & Latihan',
    'Divisi Kesekretariatan',
    'Divisi Jasmani & Rohani',
    'Divisi Humas',
    'Divisi Dana & Usaha',
  ]

  const sortedDivisi = Object.entries(groupedPengurus).sort(([a], [b]) => {
    const ai = divisiOrder.indexOf(a)
    const bi = divisiOrder.indexOf(b)
    if (ai === -1 && bi === -1) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })

  return (
    <>
      <section className="pt-28 pb-6 md:pt-36 md:pb-8">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
          >
            Struktur Pengurus
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
            className="mt-3 text-base text-muted-foreground max-w-xl leading-relaxed"
          >
            HIMATIF ITG 2026/2027
          </motion.p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-[#1a1a1a] rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-16"
            >
              {pimpinan.length > 0 && (
                <div>
                  <SectionHeader title="Pimpinan" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pimpinan.map((member, i) => (
                      <PengurusCard
                        key={member.id}
                        pengurus={member}
                        index={i}
                        onClick={() => setSelectedMember(member)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {bendaharaSekretaris.length > 0 && (
                <div>
                  <SectionHeader title="Bendahara dan Sekretaris" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {bendaharaSekretaris.map((member, i) => (
                      <PengurusCard
                        key={member.id}
                        pengurus={member}
                        index={i}
                        onClick={() => setSelectedMember(member)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {sortedDivisi.map(([divisi, members]) => (
                <div key={divisi}>
                  <SectionHeader title={divisi} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {members.map((member, i) => (
                      <PengurusCard
                        key={member.id}
                        pengurus={member}
                        index={i}
                        onClick={() => setSelectedMember(member)}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {pengurus.length === 0 && (
                <p className="text-center text-muted-foreground">Belum ada data pengurus.</p>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Dialog
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        variant="fullscreen"
      >
        {selectedMember && (
          <div className="relative overflow-hidden rounded-2xl bg-[#121212]">
            <div className="relative">
              {selectedMember.foto ? (
                <img
                  src={assetUrl(selectedMember.foto)!}
                  alt={selectedMember.nama}
                  className="w-full object-cover block max-h-[55vh]"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-b from-[#1a1a1a] to-[#0c0c0c]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                <span className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] bg-orange-600 text-white mb-3 drop-shadow-lg">
                  {selectedMember.jabatan}
                </span>
                <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-2xl">
                  {selectedMember.nama}
                </h2>
                {selectedMember.nama_divisi && (
                  <p className="text-white/70 text-sm font-medium mt-1 drop-shadow-md">
                    {selectedMember.nama_divisi}
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 pt-4">
              {selectedMember.kutipan && selectedMember.kutipan.trim() !== '' && (
                <div className="max-w-md mb-6">
                  <p className="text-white/95 text-sm italic leading-relaxed border-l-2 border-orange-500 pl-4">
                    "{selectedMember.kutipan}"
                  </p>
                </div>
              )}

              {(selectedMember.instagram || selectedMember.linkedin || selectedMember.github) && (
                <div className="flex flex-wrap gap-6 pt-6 border-t border-white/10">
                  {selectedMember.instagram && (
                    <a
                      href={`https://instagram.com/${selectedMember.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-white/90 hover:text-white transition-all duration-300"
                    >
                      <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-pink-600 border border-white/5">
                        <InstagramLogo size={16} weight="fill" />
                      </div>
                      <span className="text-xs font-bold tracking-wide">@{selectedMember.instagram}</span>
                    </a>
                  )}
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin.startsWith('http') ? selectedMember.linkedin : `https://linkedin.com/in/${selectedMember.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-white/90 hover:text-white transition-all duration-300"
                    >
                      <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-[#0077b5] border border-white/5">
                        <LinkedinLogo size={16} weight="fill" />
                      </div>
                      <span className="text-xs font-bold tracking-wide">LinkedIn</span>
                    </a>
                  )}
                  {selectedMember.github && (
                    <a
                      href={selectedMember.github.startsWith('http') ? selectedMember.github : `https://github.com/${selectedMember.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-white/90 hover:text-white transition-all duration-300"
                    >
                      <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md hover:bg-white border border-white/5">
                        <GithubLogo size={16} weight="fill" />
                      </div>
                      <span className="text-xs font-bold tracking-wide">GitHub</span>
                    </a>
                  )}
                </div>
              )}

              {(!selectedMember.kutipan || selectedMember.kutipan.trim() === '') && !selectedMember.instagram && !selectedMember.linkedin && !selectedMember.github && (
                <p className="text-muted-foreground text-sm">{selectedMember.nama}</p>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-20 rounded-full bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:bg-orange-500 transition-all border border-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        )}
      </Dialog>
    </>
  )
}
