import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { UsersThree, Newspaper, ClipboardText, Users, Eye, PencilSimple, UsersThree as UsersThreeIcon, Gear, FileText } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getAllPengurusApi } from '@/api/pengurus.api'
import { getAllBeritaApi } from '@/api/berita.api'
import { getAllRegistrasiApi } from '@/api/registrasi.api'
import { getAllUsersApi } from '@/api/users.api'
import { useNavigate } from 'react-router-dom'

interface Stat {
  label: string
  value: number
  icon: React.ElementType
  color: string
}

const quickActions = [
  { label: 'Tulis Berita', icon: PencilSimple, path: '/admin/berita', roles: ['super_admin', 'admin', 'informasi'] },
  { label: 'Kelola Pengurus', icon: UsersThreeIcon, path: '/admin/pengurus', roles: ['super_admin', 'admin'] },
  { label: 'Lihat Pendaftar', icon: FileText, path: '/admin/registrasi', roles: ['super_admin', 'admin', 'informasi'] },
  { label: 'Pengaturan', icon: Gear, path: '/admin/pengaturan', roles: ['super_admin', 'admin'] },
]

export default function Dashboard() {
  useDocumentTitle('Dashboard')
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pengurusRes, beritaRes, registrasiRes] = await Promise.all([
          getAllPengurusApi(),
          getAllBeritaApi(),
          getAllRegistrasiApi(),
        ])

        let userCount = 0
        if (user?.role === 'super_admin') {
          const usersRes = await getAllUsersApi()
          userCount = usersRes.data?.length || 0
        }

        setStats([
          {
            label: 'Total Pengurus',
            value: pengurusRes.data?.length || 0,
            icon: UsersThree,
            color: 'text-blue-400',
          },
          {
            label: 'Total Berita',
            value: beritaRes.data?.length || 0,
            icon: Newspaper,
            color: 'text-green-400',
          },
          {
            label: 'Total Pendaftar',
            value: registrasiRes.data?.length || 0,
            icon: ClipboardText,
            color: 'text-purple-400',
          },
          ...(user?.role === 'super_admin'
            ? [{
                label: 'Total Users',
                value: userCount,
                icon: Users as React.ElementType,
                color: 'text-yellow-400',
              }]
            : []),
        ])
      } catch {
        setStats([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const availableActions = quickActions.filter(a => a.roles.includes(user?.role || ''))

  const roleBadgeLabel: Record<string, string> = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    teknologi: 'Teknologi',
    informasi: 'Informasi',
  }
  const badgeLabel = roleBadgeLabel[user?.role || ''] || 'Admin'

  const roleBadgeColor: Record<string, string> = {
    super_admin: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    admin: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    teknologi: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    informasi: 'bg-green-500/20 text-green-400 border-green-500/30',
  }
  const badgeColor = roleBadgeColor[user?.role || ''] || 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-2xl font-bold text-foreground">
            Selamat Datang, {user?.full_name || 'Admin'}
          </h1>
          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${badgeColor}`}>
            {badgeLabel}
          </span>
        </div>
        <p className="text-sm text-[#a3a3a3]">Berikut ringkasan aktivitas Himatif</p>
      </motion.div>

      {user?.role === 'informasi' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="bg-[#121212] border border-[#222222]/50 rounded-2xl p-5 flex items-start gap-3"
        >
          <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
            <Eye size={18} className="text-[#f97316]" />
          </div>
          <p className="text-sm text-[#a3a3a3] leading-relaxed">
            Anda memiliki akses terbatas sebagai role <span className="text-[#fafafa] font-medium">Informasi</span>. Anda dapat mengelola berita dan melihat pendaftaran.
          </p>
        </motion.div>
      )}

      {loading ? (
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 flex-1 rounded-2xl" />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="flex gap-4"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i + 0.2, ease: [0.32, 0.72, 0, 1] }}
                className="flex-1 bg-[#121212] border border-[#222222]/50 rounded-2xl p-5 flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#fafafa]">{stat.value}</p>
                  <p className="text-sm text-[#a3a3a3]">{stat.label}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <h2 className="text-sm font-semibold text-[#a3a3a3] uppercase tracking-wider mb-4">Aksi Cepat</h2>
        <div className="flex gap-3">
          {availableActions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant="outline"
                onClick={() => navigate(action.path)}
                className="h-auto py-3 px-5 flex items-center gap-2 rounded-full border-[#222222]/50 bg-[#121212] hover:bg-[#1a1a1a] text-[#a3a3a3] hover:text-[#fafafa]"
              >
                <Icon size={16} />
                <span className="text-sm">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
