import { useState } from 'react'
import { MapPin, Envelope, Phone, Clock, PaperPlaneRight, InstagramLogo, YoutubeLogo, Globe } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const contactInfo = [
  { icon: MapPin, label: 'Alamat', value: 'Jl. Singaperbangsa No.3, Garut, Jawa Barat' },
  { icon: Envelope, label: 'Email', value: 'himatif@itg.ac.id' },
  { icon: Phone, label: 'Telepon', value: '(0262) 123456' },
  { icon: Clock, label: 'Jam Operasional', value: 'Senin - Jumat, 08:00 - 16:00 WIB' },
]

export default function KontakPage() {
  useDocumentTitle('Kontak')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
                Hubungi Kami
              </h1>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="text-foreground font-medium">{info.value}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Media Sosial</h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/himatif_itg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#121212] border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    <InstagramLogo size={20} />
                  </a>
                  <a
                    href="https://youtube.com/@himatifitg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#121212] border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    <YoutubeLogo size={20} />
                  </a>
                  <a
                    href="https://tiktok.com/@himatif_itg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#121212] border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    <Globe size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-[#121212] rounded-2xl border border-border/50"
                >
                  <PaperPlaneRight size={48} className="text-primary mx-auto mb-4" />
                  <p className="text-foreground font-medium text-lg">Pesan terkirim!</p>
                  <p className="text-sm text-muted-foreground mt-1">Kami akan menghubungi Anda segera.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <input
                        id="name"
                        placeholder="Nama"
                        required
                        className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      id="subject"
                      placeholder="Subjek"
                      required
                      className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <textarea
                      id="message"
                      placeholder="Pesan"
                      rows={4}
                      required
                      className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <PaperPlaneRight size={16} className="mr-2" />
                    Kirim Pesan
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl overflow-hidden border border-border/50 h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d961.405698977456!2d107.89591351514937!3d-7.205645755184355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68b19dcce7a455%3A0xddf907979e5e7644!2sHIMATIF%20ITG!5e0!3m2!1sid!2sid!4v1784563892714!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi ITG"
            />
          </div>
        </div>
      </section>
    </>
  )
}
