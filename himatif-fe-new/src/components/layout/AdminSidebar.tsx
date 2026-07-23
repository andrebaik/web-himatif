import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Gauge, Users, UsersThree, Newspaper, ClipboardText, Gear, UserCircle, SignOut, CaretLeft, CaretRight
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: Gauge, roles: ['super_admin', 'admin', 'informasi'] },
  { label: 'Kelola Users', to: '/admin/users', icon: Users, roles: ['super_admin'] },
  { label: 'Kelola Pengurus', to: '/admin/pengurus', icon: UsersThree, roles: ['super_admin', 'admin'] },
  { label: 'Kelola Berita', to: '/admin/berita', icon: Newspaper, roles: ['super_admin', 'admin', 'informasi'] },
  { label: 'Pendaftaran', to: '/admin/registrasi', icon: ClipboardText, roles: ['super_admin', 'admin', 'informasi'] },
  { label: 'Pengaturan', to: '/admin/pengaturan', icon: Gear, roles: ['super_admin', 'admin'] },
  { label: 'Profil Saya', to: '/admin/profil', icon: UserCircle, roles: ['super_admin', 'admin', 'informasi'] },
]

export default function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const filteredItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  )

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 256 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] as const }}
      className="hidden md:flex flex-col h-screen fixed left-0 top-0 border-r border-border bg-background z-30 overflow-hidden"
    >
      <div className="p-6 border-b border-border flex items-center">
        <Link to="/admin" className="text-lg font-bold text-foreground whitespace-nowrap">
          <span className="text-primary">H</span>
          {!collapsed && <span>IMATIF Admin</span>}
        </Link>
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
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] whitespace-nowrap',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <SignOut size={20} className="shrink-0" />
          {!collapsed && 'Logout'}
        </Button>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors text-sm"
        >
          {collapsed ? <CaretRight size={18} /> : <CaretLeft size={18} />}
          {!collapsed && ' Sembunyikan'}
        </button>
      </div>
    </motion.aside>
  )
}
