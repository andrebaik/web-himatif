import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import PublicLayout from '@/components/layout/PublicLayout'
import AdminLayout from '@/components/layout/AdminLayout'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'
import PengurusPage from '@/pages/PengurusPage'
import BeritaPage from '@/pages/BeritaPage'
import BeritaDetail from '@/pages/BeritaDetail'
import KontakPage from '@/pages/KontakPage'
import JoinPage from '@/pages/JoinPage'
import ProdukHukumPage from '@/pages/ProdukHukumPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import Dashboard from '@/pages/admin/Dashboard'
import Users from '@/pages/admin/Users'
import AdminPengurus from '@/pages/admin/Pengurus'
import AdminBerita from '@/pages/admin/Berita'
import AdminRegistrasi from '@/pages/admin/Registrasi'
import Pengaturan from '@/pages/admin/Pengaturan'
import AdminProfile from '@/pages/admin/Profile'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pengurus" element={<PengurusPage />} />
            <Route path="/berita" element={<BeritaPage />} />
            <Route path="/berita/:slug" element={<BeritaDetail />} />
            <Route path="/kontak" element={<KontakPage />} />
            <Route path="/join" element={<JoinPage />} />
            <Route path="/produk-hukum" element={<ProdukHukumPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="pengurus" element={<AdminPengurus />} />
            <Route path="berita" element={<AdminBerita />} />
            <Route path="registrasi" element={<AdminRegistrasi />} />
            <Route path="pengaturan" element={<Pengaturan />} />
            <Route path="profil" element={<AdminProfile />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
