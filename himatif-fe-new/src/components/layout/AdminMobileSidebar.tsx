import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Gauge, Users, UsersThree, Newspaper, ClipboardText, Gear, UserCircle, SignOut
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

interface AdminMobileSidebarProps {
  onClose: () => void
}

export default function AdminMobileSidebar({ onClose }: AdminMobileSidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const navItems = [
    { label: 'Dashboard', to: '/admin', icon: Gauge, roles: ['super_admin', 'admin', 'informasi'] },
    { label: 'Kelola Users', to: '/admin/users', icon: Users, roles: ['super_admin'] },
    { label: 'Kelola Pengurus', to: '/admin/pengurus', icon: UsersThree, roles: ['super_admin', 'admin'] },
    { label: 'Kelola Berita', to: '/admin/berita', icon: Newspaper, roles: ['super_admin', 'admin', 'informasi'] },
    { label: 'Pendaftaran', to: '/admin/registrasi', icon: ClipboardText, roles: ['super_admin', 'admin', 'informasi'] },
    { label: 'Pengaturan', to: '/admin/pengaturan', icon: Gear, roles: ['super_admin', 'admin'] },
    { label: 'Profil Saya', to: '/admin/profil', icon: UserCircle, roles: ['super_admin', 'admin', 'informasi'] },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const filteredItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <span className="text-lg font-bold text-foreground">
          <span className="text-primary">HIMATIF</span> Admin
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredItems.map((item) => {
          const Icon = item.icon
          const isActive = item.to === '/admin'
            ? location.pathname === '/admin'
            : location.pathname.startsWith(item.to)

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <SignOut size={20} />
          Logout
        </Button>
      </div>
    </div>
  )
}
