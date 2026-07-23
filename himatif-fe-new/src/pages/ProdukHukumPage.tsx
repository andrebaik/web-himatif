import { FilePdf, Download, CalendarBlank } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { produkHukum } from '@/data/produkHukum'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function ProdukHukumPage() {
  useDocumentTitle('Produk Hukum')

  return (
    <>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            Produk Hukum
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Kumpulan dokumen dan kebijakan resmi organisasi HIMATIF ITG.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4">
          {produkHukum.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              Belum ada produk hukum.
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="grid md:grid-cols-2 gap-6"
            >
              {produkHukum.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#121212] border border-[#222222]/50 rounded-2xl p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                      <FilePdf size={24} className="text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground leading-snug">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      {item.date && (
                        <p className="text-xs text-muted-foreground/70 mt-2 flex items-center gap-1">
                          <CalendarBlank size={14} />
                          {item.date}
                        </p>
                      )}
                    </div>
                  </div>
                  <a
                    href={item.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary text-white text-sm font-medium h-10 px-5 hover:opacity-90 transition-opacity"
                  >
                    <Download size={16} />
                    Unduh
                  </a>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}
