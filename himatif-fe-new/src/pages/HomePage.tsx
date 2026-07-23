import { motion } from 'framer-motion'
import { ArrowRight, Users, Lightbulb, Code, Handshake } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import NewsCard from '@/components/common/NewsCard'
import RotatingText from '@/components/common/RotatingText'
import DeveloperSection from '@/components/common/DeveloperSection'
import { GlareHover } from '@/components/ui/glare-hover'
import { getAllBeritaApi } from '@/api/berita.api'
import type { Berita } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle('Beranda')
  const [berita, setBerita] = useState<Berita[]>([])

  useEffect(() => {
    getAllBeritaApi().then((res) => {
      if (res.data) setBerita(res.data.slice(0, 3))
    }).catch(() => {})
  }, [])

  return (
    <>
      <section className="relative min-h-[85dvh] flex items-center bg-gradient-to-b from-[#121212] to-[#0c0c0c] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[0.9] mb-6">
                Tempat{' '}
                <RotatingText
                  texts={['Berkembang', 'Berorganisasi', 'Berinovasi', 'Belajar', 'Aspirasi', 'Kolaborasi', 'Bersosialisasi']}
                  mainClassName="px-4 sm:px-4 md:px-5 bg-orange-500 text-black overflow-hidden py-1 sm:py-1.5 md:py-3 rounded-lg"
                  staggerFrom="last"
                  initial={{ y: '80%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-80%', opacity: 0 }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                  animatePresenceMode="popLayout"
                  animatePresenceInitial={false}
                />
                <br />
                Mahasiswa Informatika
              </h1>
              <p className="text-lg text-muted-foreground max-w-[50ch] leading-relaxed mb-8">
                Bersama HIMATIF, wujudkan potensi terbaikmu sebagai mahasiswa Informatika
                yang kreatif, inovatif, dan berkarakter.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about">
                  <Button size="lg">
                    Pelajari Lebih Lanjut
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link to="/join">
                  <Button variant="outline" size="lg">
                    Gabung Sekarang
                  </Button>
                </Link>
              </div>
            </motion.div>
            <div className="hidden lg:flex items-center justify-center">
              <GlareHover className="rounded-full" color="#ffffff" opacity={0.3} duration={1500}>
                <img src="/logo-himatif.png" alt="HIMATIF" className="w-120 h-auto" />
              </GlareHover>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="text-3xl md:text-4xl font-bold text-foreground mb-6"
              >
                Sekilas Tentang HIMATIF
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
                className="text-muted-foreground leading-relaxed mb-4"
              >
                HIMATIF adalah himpunan mahasiswa program studi Informatika di Institut Teknologi Garut.
                Didirikan sebagai wadah pengembangan potensi mahasiswa di bidang teknologi informasi,
                HIMATIF aktif menyelenggarakan berbagai kegiatan akademik, pelatihan, dan pengabdian
                masyarakat.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="text-muted-foreground leading-relaxed mb-6"
              >
                Sejak 2012, HIMATIF telah menjadi rumah bagi mahasiswa Informatika untuk berkembang,
                berkolaborasi, dan berkontribusi bagi masyarakat luas.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
              >
                <Link to="/about">
                  <Button variant="outline">
                    Selengkapnya <ArrowRight size={16} />
                  </Button>
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, scale: 0.85, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-orange-500/20 group-hover:border-orange-500/40 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 p-8 text-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img src="/logo-himatif.png" alt="HIMATIF" className="w-32 h-32 mx-auto mb-6 object-contain rounded-full ring-2 ring-orange-500/30 group-hover:ring-orange-500/50 transition-all duration-300" />
                  </motion.div>
                  <span className="text-6xl font-bold text-primary block leading-none">2012</span>
                  <p className="text-muted-foreground mt-2">Berdiri sejak 2012</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#121212]">
        <div className="mx-auto max-w-7xl px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-12"
          >
            Kenapa Bergabung dengan HIMATIF?
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
            >
              <div className="group h-full relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-orange-500/30 group-hover:border-orange-500/50 rounded-2xl transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-8 flex flex-col md:flex-row items-start gap-6">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-300 shrink-0"
                  >
                    <Users size={40} weight="fill" className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Networking</h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      Bangun koneksi dengan mahasiswa Informatika dari berbagai angkatan dan alumni.
                      Perluas jaringan profesionalmu sejak dini.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
            >
              <div className="group h-full relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-orange-500/20 group-hover:border-orange-500/50 rounded-2xl transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-7">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                    className="mb-5 inline-flex p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-300"
                  >
                    <Lightbulb size={32} weight="fill" className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Pengembangan Skill</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Asah kemampuan teknis dan soft skill melalui berbagai program kerja dan pelatihan.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
            >
              <div className="group h-full relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-orange-500/20 group-hover:border-orange-500/50 rounded-2xl transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-7">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ duration: 0.3 }}
                    className="mb-5 inline-flex p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-300"
                  >
                    <Code size={32} weight="fill" className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-3">Proyek Nyata</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    Terlibat dalam proyek nyata yang menambah portofolio dan pengalaman.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
            >
              <div className="group h-full relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-orange-500/30 group-hover:border-orange-500/50 rounded-2xl transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-8 flex flex-col md:flex-row items-start gap-6">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 group-hover:border-orange-500/60 transition-all duration-300 shrink-0"
                  >
                    <Handshake size={40} weight="fill" className="text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">Kolaborasi</h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      Belajar berkolaborasi dalam tim organisasi yang solid dan dinamis.
                      Kembangkan kemampuan kepemimpinan dan kerja sama tim.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {berita.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Berita Terbaru</h2>
              <Link to="/berita" className="hidden sm:block">
                <Button variant="outline">
                  Lihat Semua <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="space-y-6">
              <NewsCard berita={berita[0]} featured />
              <div className="grid md:grid-cols-2 gap-6">
                {berita.slice(1).map((item) => (
                  <NewsCard key={item.id} berita={item} />
                ))}
              </div>
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link to="/berita">
                <Button variant="outline">
                  Lihat Semua <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 bg-[#121212]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Siap Bergabung?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Jadilah bagian dari keluarga besar HIMATIF dan wujudkan potensi terbaikmu
            bersama mahasiswa Informatika lainnya.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/join">
              <Button size="lg">
                Daftar Sekarang <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/kontak">
              <Button size="lg" variant="outline">
                Hubungi Kami
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <DeveloperSection />
    </>
  )
}
