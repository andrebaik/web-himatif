import { useLocation, useNavigate } from 'react-router-dom'
import { List, SignOut } from '@phosphor-icons/react'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
  onMenuClick: () => void
}

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/users': 'Kelola Users',
  '/admin/pengurus': 'Kelola Pengurus',
  '/admin/berita': 'Kelola Berita',
  '/admin/registrasi': 'Pendaftaran',
  '/admin/pengaturan': 'Pengaturan',
  '/admin/profil': 'Profil Saya',
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const title = pageTitles[location.pathname] || 'Admin'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden rounded-md p-2 text-muted-foreground hover:text-foreground"
        >
          <List size={22} />
        </button>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-muted-foreground">
          {user?.full_name}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-destructive"
          title="Logout"
        >
          <SignOut size={20} />
        </Button>
      </div>
    </header>
  )
}
