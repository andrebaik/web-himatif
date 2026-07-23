import { useEffect, useState } from 'react'
import { Check, ArrowRight, WhatsappLogo } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Countdown from '@/components/common/Countdown'
import { createRegistrasiApi } from '@/api/registrasi.api'
import { getStatusApi } from '@/api/settings.api'
import type { RegistrationStatus } from '@/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function JoinPage() {
  useDocumentTitle('Gabung')
  const [status, setStatus] = useState<RegistrationStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    nama_lengkap: '',
    nim: '',
    angkatan: '',
    kelas: '',
    email: '',
    no_whatsapp: '',
    alasan_bergabung: '',
  })

  useEffect(() => {
    getStatusApi()
      .then((res) => {
        if (res.data) setStatus(res.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await createRegistrasiApi(form)
      setSubmitted(true)
    } catch {
      setError('Gagal mendaftar. Silakan coba lagi.')
    } finally {
      setSubmitting(false)
    }
  }

  const isOpen = status?.status === 'open'
  const closeDate = status?.registration_close
  const openTarget = new Date(Date.now() + 146 * 24 * 60 * 60 * 1000)

  return (
    <>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Gabung HIMATIF
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Bergabunglah menjadi bagian dari HIMATIF ITG.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4">
          {loading ? (
            <div className="text-center text-muted-foreground py-20">Memuat status pendaftaran...</div>
          ) : !status ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>Gagal memuat status pendaftaran.</p>
            </div>
          ) : !isOpen ? (
            <div className="max-w-lg mx-auto">
              <div className="rounded-2xl bg-[#121212] border border-border/50 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {status.status === 'not_started'
                    ? 'Pendaftaran Belum Dibuka'
                    : status.status === 'not_configured'
                    ? 'Pendaftaran Belum Dikonfigurasi'
                    : 'Pendaftaran Ditutup'}
                </h2>
                <p className="text-muted-foreground">{status.message}</p>
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-3">Pendaftaran dibuka dalam:</p>
                  <Countdown targetDate={openTarget} />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-foreground mb-4">Gabung HIMATIF</h2>
                <p className="text-muted-foreground mb-8">{status.message}</p>
                {closeDate && (
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Pendaftaran Dibuka
                    </div>
                    <Countdown targetDate={closeDate} />
                  </div>
                )}
              </div>

              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="rounded-2xl bg-[#121212] border border-border/50 p-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <Check size={32} />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">Pendaftaran Berhasil!</h2>
                      <p className="text-muted-foreground mb-6">
                        Terima kasih telah mendaftar. Kami akan menghubungi Anda melalui WhatsApp.
                      </p>
                      <a
                        href="https://chat.whatsapp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>
                          <WhatsappLogo size={18} className="mr-2" />
                          Gabung Grup WhatsApp
                        </Button>
                      </a>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <input
                              id="nama_lengkap"
                              placeholder="Nama Lengkap"
                              value={form.nama_lengkap}
                              onChange={handleChange}
                              required
                              className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                            />
                          </div>
                          <div>
                            <input
                              id="nim"
                              placeholder="NIM"
                              value={form.nim}
                              onChange={handleChange}
                              required
                              className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <input
                              id="angkatan"
                              placeholder="Angkatan"
                              value={form.angkatan}
                              onChange={handleChange}
                              required
                              className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                            />
                          </div>
                          <div>
                            <input
                              id="kelas"
                              placeholder="Kelas"
                              value={form.kelas}
                              onChange={handleChange}
                              required
                              className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                            />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <input
                              id="email"
                              type="email"
                              placeholder="Email"
                              value={form.email}
                              onChange={handleChange}
                              required
                              className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                            />
                          </div>
                          <div>
                            <input
                              id="no_whatsapp"
                              placeholder="No. WhatsApp"
                              value={form.no_whatsapp}
                              onChange={handleChange}
                              required
                              className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                            />
                          </div>
                        </div>
                        <div>
                          <textarea
                            id="alasan_bergabung"
                            placeholder="Alasan Bergabung"
                            value={form.alasan_bergabung}
                            onChange={handleChange}
                            rows={3}
                            required
                            className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground resize-none"
                          />
                        </div>
                        {error && <p className="text-sm text-destructive-foreground">{error}</p>}
                        <Button type="submit" className="w-full" disabled={submitting}>
                          {submitting ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                          <ArrowRight size={16} className="ml-2" />
                        </Button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
