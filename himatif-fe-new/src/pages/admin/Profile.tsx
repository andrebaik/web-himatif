import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserCircle, EnvelopeSimple, Lock, ShieldCheck } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { updateUserApi } from '@/api/users.api'

export default function AdminProfile() {
  useDocumentTitle('Profil Saya')
  const { user, login } = useAuth()
  const [fullName, setFullName] = useState(user?.full_name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!user) return
    if (password && password !== confirmPassword) {
      setError('Password tidak cocok')
      return
    }
    setSaving(true)
    setSuccess(false)
    setError('')
    try {
      const payload: Record<string, string> = { full_name: fullName, email }
      if (password) payload.password = password
      const res = await updateUserApi(user.user_id, payload)
      if (res.data) {
        login(res.data, localStorage.getItem('authToken') || '')
      }
      setSuccess(true)
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      setError('Gagal menyimpan profil')
    }
    setSaving(false)
  }

  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      >
        <h1 className="text-xl font-bold text-[#fafafa] mb-1">Profil Saya</h1>
        <p className="text-sm text-[#a3a3a3] mb-6">Kelola informasi profil Anda</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
        className="bg-[#121212] border border-[#222222]/50 rounded-2xl p-6 space-y-5"
      >
        <div className="flex items-center gap-4 pb-4 border-b border-[#222222]/50">
          <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center ring-1 ring-[#222222]">
            <UserCircle size={28} className="text-[#a3a3a3]" />
          </div>
          <div>
            <p className="text-base font-semibold text-[#fafafa]">{user?.full_name}</p>
            <p className="text-sm text-[#a3a3a3]">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-[#a3a3a3] flex items-center gap-2">
            <UserCircle size={14} /> Nama Lengkap
          </Label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-[#a3a3a3] flex items-center gap-2">
            <EnvelopeSimple size={14} /> Email
          </Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-[#a3a3a3] flex items-center gap-2">
            <Lock size={14} /> Password Baru (kosongkan jika tidak diubah)
          </Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-[#a3a3a3] flex items-center gap-2">
            <Lock size={14} /> Konfirmasi Password
          </Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-[#a3a3a3] flex items-center gap-2">
            <ShieldCheck size={14} /> Role
          </Label>
          <Input
            value={user?.role || ''}
            disabled
            className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl text-[#a3a3a3]"
          />
        </div>

        {success && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2"
          >
            Profil berhasil diperbarui.
          </motion.p>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2"
          >
            {error}
          </motion.p>
        )}

        <Button onClick={handleSave} disabled={saving} className="w-full rounded-full h-11">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </motion.div>
    </div>
  )
}
