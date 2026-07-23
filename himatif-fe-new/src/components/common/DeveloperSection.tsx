import { motion } from 'framer-motion'
import Folder from './Folder'

interface Developer {
  nama: string
  foto: string
  instagram?: string
}

const developers: Developer[] = [
  {
    nama: 'Andre Kiri',
    foto: '/images/developer-web/kiri.png',
  },
  {
    nama: 'Andre Kanan',
    foto: '/images/developer-web/kanan.png',
  },
  {
    nama: 'Andre Tengah',
    foto: '/images/developer-web/tengah.png',
  },
]

export default function DeveloperSection() {
  const folderItems = developers.map(dev => (
    <div key={dev.nama} className="w-full h-full relative overflow-hidden rounded-[10px]">
      <img
        src={dev.foto}
        alt={dev.nama}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-1.5 hidden sm:block">
        <p className="text-white font-semibold text-[8px] md:text-[9px] leading-tight drop-shadow-lg">
          {dev.nama}
        </p>
        <p className="text-orange-300 text-[6px] md:text-[6.5px] font-medium drop-shadow-md">
          Developer Web
        </p>
      </div>
    </div>
  ))

  return (
    <section className="py-24 pb-36 md:pb-48">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-16"
        >
          
          <h2 className="text-4xl font-bold text-foreground">Developer Web</h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Pengembang di balik website HIMATIF ITG
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="flex justify-center mt-16 md:mt-20"
        >
          <Folder
            size={3}
            color="#f97316"
            items={folderItems}
            className="inline-block"
          />
        </motion.div>
      </div>
    </section>
  )
}
