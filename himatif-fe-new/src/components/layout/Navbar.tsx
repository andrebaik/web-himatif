import StaggeredMenu from '@/components/common/StaggeredMenu'

const navItems = [
  { label: 'Beranda', link: '/' },
  { label: 'Tentang', link: '/about' },
  { label: 'Pengurus', link: '/pengurus' },
  { label: 'Berita', link: '/berita' },
  { label: 'AD/ART', link: '/produk-hukum' },
  { label: 'Kontak', link: '/kontak' },
]

export default function Navbar() {
  return (
    <StaggeredMenu
      position="right"
      isFixed={true}
      colors={['#0c0c0c', '#121212', '#1a1a1a']}
      items={navItems}
      logoUrl="/logo-himatif.png"
      accentColor="#f97316"
      menuButtonColor="#fafafa"
      openMenuButtonColor="#fafafa"
      displayItemNumbering={true}
      displaySocials={false}
      closeOnClickAway={true}
    />
  )
}
