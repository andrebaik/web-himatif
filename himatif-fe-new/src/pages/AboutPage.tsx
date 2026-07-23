import { motion } from 'framer-motion'
import { Target, Lightbulb, Rocket, GraduationCap } from '@phosphor-icons/react'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect } from 'react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const eras = [
  {
    period: '2014 - 2017',
    title: 'Era Awal',
    description: 'Transformasi dari HIMIF menjadi HIMATIF STTG',
    leaders: [
      { nama: 'Muhammad Rikza Nashrolloh', periode: '2014 - 2015' },
      { nama: 'Cecep Saepuloh', periode: '2015 - 2016' },
      { nama: 'Cecep Ilham Mudina', periode: '2016 - 2017' },
    ],
  },
  {
    period: '2017 - 2020',
    title: 'Era Konsolidasi',
    description: 'Penguatan struktur organisasi',
    leaders: [
      { nama: 'M. Safik Aghna', periode: '2017 - 2018' },
      { nama: 'Fahmi Fadillah Septiana', periode: '2018 - 2019' },
      { nama: 'Aditia Agnan Fadillah', periode: '2019 - 2020' },
    ],
  },
  {
    period: '2020 - 2024',
    title: 'Era Transformasi',
    description: 'Menghadapi tantangan & transformasi HIMATIF ITG',
    leaders: [
      { nama: 'Hari Ilham Nur Akbar', periode: '2020 - 2021' },
      { nama: 'Lutfi Abdurrahman Nashier', periode: '2021 - 2022' },
      { nama: 'Ramdan Ragmah Hidayat', periode: '2022 - 2023' },
      { nama: 'Muhammad Arif Syamsudin', periode: '2023 - 2024' },
    ],
  },
  {
    period: '2024 - 2027',
    title: 'Era Digital',
    description: 'HIMATIF ITG modern & digital',
    leaders: [
      { nama: 'Gea Davids Khalik', periode: '2024 - 2025' },
      { nama: 'Sigit Firman Hakim', periode: '2025 - 2026' },
      { nama: 'Faujan Alamsyah', periode: '2026 - 2027' },
    ],
  },
]

const programKerja = [
  {
    icon: GraduationCap,
    title: 'Informatics Academy',
    description: 'Program pelatihan dan workshop untuk meningkatkan kompetensi mahasiswa di bidang teknologi informasi.',
  },
  {
    icon: Rocket,
    title: 'Startup Weekend',
    description: 'Event kewirausahaan teknologi yang mendorong mahasiswa menciptakan solusi inovatif.',
  },
  {
    icon: Target,
    title: 'Pengabdian Masyarakat',
    description: 'Program pengabdian yang memanfaatkan teknologi untuk membantu masyarakat sekitar.',
  },
]

export default function AboutPage() {
  useDocumentTitle('Tentang Kami')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
                Tentang Kami
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mengenal lebih dekat HIMATIF ITG, sejarah, tujuan, dan program kerja kami.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <div className="h-px w-16 bg-orange-500/40" />
              <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">Sejak 2012</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl mb-20">
            <h2 className="text-3xl font-bold text-foreground mb-6">Sejarah singkat HIMATIF</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                HIMATIF adalah organisasi mahasiswa di civitas akademika Institut Teknologi Garut yang bertempat di Kampus Institut Teknologi Garut, berasal dari HIMIF STTG yang disempurnakan menjadi HIMATIF STTG pada 17 September 2012 dan bertransformasi menjadi HIMATIF ITG pada 10 September 2021 hingga sekarang.
              </p>
              <p>
                HIMATIF ITG (Himpunan Mahasiswa Teknik Informatika Institut Teknologi Garut) adalah organisasi yang menjadi wadah pengembangan, kreativitas, dan kolaborasi mahasiswa Teknik Informatika dalam mewujudkan insan teknologi yang berintegritas dan berdaya saing.
              </p>
              <p>
                HIMATIF ITG (Himpunan Mahasiswa Teknik Informatika Institut Teknologi Garut) merupakan organisasi kemahasiswaan yang bernaung di bawah civitas akademika Institut Teknologi Garut. Organisasi ini menjadi wadah bagi mahasiswa Teknik Informatika untuk mengembangkan potensi diri, memperluas wawasan, serta berkontribusi dalam bidang akademik maupun non-akademik. Melalui HIMATIF, mahasiswa diharapkan dapat membangun solidaritas, meningkatkan kemampuan profesional, dan berperan aktif dalam kemajuan teknologi serta kehidupan kampus.
              </p>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground mb-12">Sejarah Kepemimpinan</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {eras.map((era, eraIdx) => (
                <motion.div
                  key={era.period}
                  initial={{ opacity: 0, y: 30, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    delay: eraIdx * 0.15,
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <div className="h-full relative overflow-hidden group rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-orange-500/20 group-hover:border-orange-500/40 rounded-2xl transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/10" />
                    
                    <div className="relative z-10 p-6 flex flex-col h-full">
                      <div className="flex flex-col gap-1 mb-5">
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: 'auto' }}
                          viewport={{ once: true }}
                          transition={{ delay: eraIdx * 0.15 + 0.2, duration: 0.4 }}
                          className="text-xs font-bold uppercase tracking-[0.15em] text-orange-400/80"
                        >
                          {era.period}
                        </motion.span>
                        <h3 className="text-2xl font-bold text-foreground">{era.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{era.description}</p>
                      </div>

                      <div className="relative flex-1 space-y-3">
                        <div className="absolute left-[13px] top-2 bottom-2 w-px bg-gradient-to-b from-orange-500/40 via-orange-500/20 to-transparent" />
                        
                        {era.leaders.map((leader, lIdx) => {
                          const isLatest = leader.nama === 'Faujan Alamsyah'
                          
                          return (
                            <motion.div
                              key={leader.nama}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: eraIdx * 0.15 + 0.3 + lIdx * 0.08,
                                duration: 0.4,
                                ease: [0.32, 0.72, 0, 1],
                              }}
                              whileHover={!isLatest ? { x: 4, transition: { duration: 0.2 } } : {}}
                              className={`relative pl-8 group/card cursor-default ${isLatest ? 'cursor-default' : 'cursor-pointer'}`}
                            >
                              <div className={`absolute left-[7px] top-2 w-[13px] h-[13px] rounded-full border-2 transition-all duration-200 ${isLatest ? 'bg-gradient-to-br from-orange-400 to-orange-600 border-orange-500 scale-125 shadow-[0_0_16px_rgba(249,115,22,0.5)]' : 'bg-orange-500 border-orange-500/30 group-hover/card:scale-125 group-hover/card:bg-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.3)]'}`} />
                              
                              <div className={`rounded-lg p-3 border transition-all duration-200 ${isLatest ? 'bg-gradient-to-r from-orange-500/15 via-orange-500/10 to-transparent border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.15)]' : 'bg-gradient-to-r from-orange-500/5 to-transparent border-transparent group-hover/card:border-orange-500/20'}`}>
                                <div className="flex items-center justify-between gap-2">
                                  <div>
                                    <span className="text-sm font-medium text-foreground block leading-tight">{leader.nama}</span>
                                    <span className="text-xs text-muted-foreground font-mono">{leader.periode}</span>
                                  </div>
                                  {isLatest && (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                                      className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-orange-500 text-white rounded-full"
                                    >
                                      Sekarang
                                    </motion.span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-foreground mb-12">Tujuan, Fungsi & Program Unggulan</h2>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: 'Tujuan',
                  items: [
                    'Mengembangkan potensi mahasiswa Informatika',
                    'Meningkatkan kualitas sumber daya manusia',
                    'Menjalin kerjasama antar mahasiswa dan alumni',
                    'Mengabdi kepada masyarakat melalui teknologi',
                  ],
                },
                {
                  icon: Lightbulb,
                  title: 'Fungsi',
                  items: [
                    'Wadah pengembangan minat dan bakat',
                    'Sarana komunikasi dan informasi',
                    'Media pengabdian masyarakat',
                    'Forum diskusi dan studi',
                  ],
                },
                {
                  icon: GraduationCap,
                  title: 'Program Kerja Unggulan',
                  items: programKerja.map((p) => p.title),
                },
              ].map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    delay: idx * 0.15,
                    duration: 0.6,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Card className="h-full relative overflow-hidden group bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                    
                    <CardContent className="p-6 relative z-10">
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center mb-4 shadow-lg"
                      >
                        <section.icon size={28} weight="fill" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-foreground mb-4">{section.title}</h3>
                      
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 + i * 0.05, duration: 0.4 }}
                            className="text-sm text-muted-foreground flex items-start gap-3 group/item"
                          >
                            <motion.span
                              className="text-orange-500 font-bold mt-1 flex-shrink-0"
                              whileHover={{ scale: 1.3 }}
                            >
                              ✓
                            </motion.span>
                            <span className="leading-relaxed group-hover/item:text-foreground transition-colors duration-200">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-12">Program Kerja Unggulan</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programKerja.map((prog, idx) => {
                const Icon = prog.icon
                return (
                  <motion.div
                    key={prog.title}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      delay: idx * 0.2,
                      duration: 0.7,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    whileHover={{ y: -12, transition: { duration: 0.3 } }}
                  >
                    <div className="h-full relative overflow-hidden group rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-orange-500/20 group-hover:border-orange-500/50 rounded-2xl transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/20" />
                      
                      <div className="relative z-10 p-7 flex flex-col h-full">
                        <motion.div
                          className="mb-5 inline-flex w-fit p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-300 shadow-lg"
                          whileHover={{ scale: 1.15, rotate: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon size={32} weight="fill" className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                        </motion.div>

                        <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">{prog.title}</h3>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed flex-grow group-hover:text-gray-300 transition-colors duration-300">
                          {prog.description}
                        </p>

                        <motion.div
                          className="mt-5 pt-4 border-t border-orange-500/20 group-hover:border-orange-500/40 transition-colors duration-300"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: idx * 0.2 + 0.3, duration: 0.4 }}
                        >
                          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                            <motion.span whileHover={{ x: 4 }}>Pelajari lebih lanjut</motion.span>
                            <motion.span whileHover={{ x: 4 }} className="text-lg">→</motion.span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
