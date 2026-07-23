import { Link } from 'react-router-dom'
import { MapPin, Envelope, Phone, InstagramLogo, YoutubeLogo, TiktokLogo } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <span className="text-4xl font-bold text-foreground tracking-tight">
              HIMATIF
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Himpunan Mahasiswa Informatika Institut Teknologi Garut. Wadah pengembangan
              mahasiswa Informatika yang kreatif, inovatif, dan berkarakter.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com/himatif_itg"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2.5 bg-[#1a1a1a] text-muted-foreground hover:text-foreground hover:bg-[#222222] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                <InstagramLogo size={18} />
              </a>
              <a
                href="https://youtube.com/@himatifitg"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2.5 bg-[#1a1a1a] text-muted-foreground hover:text-foreground hover:bg-[#222222] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                <YoutubeLogo size={18} />
              </a>
              <a
                href="https://tiktok.com/@himatif_itg"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2.5 bg-[#1a1a1a] text-muted-foreground hover:text-foreground hover:bg-[#222222] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              >
                <TiktokLogo size={18} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest">Tautan</h3>
              <ul className="space-y-2.5">
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Beranda</Link></li>
                <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Tentang Kami</Link></li>
                <li><Link to="/pengurus" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pengurus</Link></li>
                <li><Link to="/berita" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Berita</Link></li>
                <li><Link to="/produk-hukum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Produk Hukum</Link></li>
                <li><Link to="/kontak" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Kontak</Link></li>
                <li><Link to="/join" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Gabung</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest">Kontak</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                  Jl. Singaperbangsa No.3, Garut
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Envelope size={16} className="shrink-0 text-primary" />
                  himatif@itg.ac.id
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone size={16} className="shrink-0 text-primary" />
                  (0262) 123456
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HIMATIF ITG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
