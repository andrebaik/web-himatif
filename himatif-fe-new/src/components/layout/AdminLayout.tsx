import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { Sheet } from '@/components/ui/sheet'
import AdminMobileSidebar from './AdminMobileSidebar'

export default function AdminLayout() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <Sheet isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} side="left">
        <AdminMobileSidebar onClose={() => setMobileSidebarOpen(false)} />
      </Sheet>

      <div className="flex-1 md:ml-64">
        <AdminHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        <main className="p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
