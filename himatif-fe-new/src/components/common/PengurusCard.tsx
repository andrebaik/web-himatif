import { motion } from 'framer-motion'
import type { Pengurus } from '@/types'
import { assetUrl } from '@/lib/utils'

interface PengurusCardProps {
  pengurus: Pengurus
  onClick?: () => void
  index?: number
}

export default function PengurusCard({ pengurus, onClick, index = 0 }: PengurusCardProps) {
  const fotoUrl = pengurus.foto ? assetUrl(pengurus.foto) : null
  const displayName = pengurus.nama_panggilan || pengurus.nama.split(' ')[0]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.32, 0.72, 0, 1] }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden rounded-2xl ring-1 ring-transparent group-hover:ring-orange-500/40 transition-all duration-500">
        {fotoUrl ? (
          <img
            src={fotoUrl}
            alt={pengurus.nama}
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#1a1a1a] to-[#0c0c0c] flex items-center justify-center">
            <span className="text-5xl font-bold text-muted-foreground/30">{displayName.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
          <h3 className="text-white font-semibold text-sm drop-shadow-lg">{displayName}</h3>
          <p className="text-white/80 text-[11px] font-medium drop-shadow-md">{pengurus.jabatan}</p>
          {pengurus.nama_divisi && (
            <p className="text-white/50 text-[10px] drop-shadow-sm">{pengurus.nama_divisi}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
