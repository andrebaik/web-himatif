import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PencilSimple, TrashSimple, Plus, MagnifyingGlass } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getAllUsersApi, createUserApi, updateUserApi, deleteUserApi } from '@/api/users.api'
import type { User } from '@/types'
import { Navigate } from 'react-router-dom'

const roleOptions = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'teknologi', label: 'Teknologi' },
  { value: 'informasi', label: 'Informasi' },
]

const roleBadgeStyle: Record<string, string> = {
  super_admin: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  admin: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  teknologi: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  informasi: 'bg-green-500/15 text-green-400 border-green-500/20',
}

export default function Users() {
  useDocumentTitle('Kelola Users')
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<User | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)
  const [form, setForm] = useState({ email: '', full_name: '', password: '', role: 'informasi' as User['role'] })

  if (user?.role !== 'super_admin') return <Navigate to="/admin" replace />

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    setLoading(true)
    getAllUsersApi()
      .then((res) => { if (res.data) setUsers(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ email: '', full_name: '', password: '', role: 'informasi' })
    setModalOpen(true)
  }

  const openEdit = (u: User) => {
    setEditing(u)
    setForm({ email: u.email, full_name: u.full_name, password: '', role: u.role })
    setModalOpen(true)
  }

  const handleSave = async () => {
    if (editing) {
      const payload: Record<string, unknown> = { email: form.email, full_name: form.full_name, role: form.role }
      if (form.password) payload.password = form.password
      await updateUserApi(editing.user_id, payload as Partial<User>)
    } else {
      await createUserApi({ ...form, is_active: true } as any)
    }
    setModalOpen(false)
    loadUsers()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteUserApi(deleteTarget.user_id)
    setDeleteTarget(null)
    loadUsers()
  }

  const filtered = users.filter((u) =>
    u.full_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
          <Input
            placeholder="Cari users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-full bg-[#121212] border-[#222222]/50"
          />
        </div>
        <Button onClick={openCreate} className="rounded-full">
          <Plus size={16} className="mr-2" />Tambah User
        </Button>
      </div>

      <div className="bg-[#121212] border border-[#222222]/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#222222]/50">
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Nama</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Email</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Role</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Status</th>
                <th className="text-right p-4 text-[#a3a3a3] font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-[#a3a3a3]">Memuat...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-[#a3a3a3]">Tidak ada data.</td></tr>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filtered.map((u, i) => (
                    <motion.tr
                      key={u.user_id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03, ease: [0.32, 0.72, 0, 1] }}
                      className="border-b border-[#222222]/30 hover:bg-[#1a1a1a]/50 transition-colors"
                    >
                      <td className="p-4">
                        <span className="font-medium text-[#fafafa]">{u.full_name}</span>
                      </td>
                      <td className="p-4 text-[#a3a3a3]">{u.email}</td>
                      <td className="p-4">
                        <Badge className={`border ${roleBadgeStyle[u.role] || 'bg-neutral-500/15 text-neutral-400'}`}>
                          {u.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={`border ${u.is_active ? 'bg-green-500/15 text-green-400 border-green-500/20' : 'bg-neutral-500/15 text-neutral-400 border-neutral-500/20'}`}>
                          {u.is_active ? 'Aktif' : 'Nonaktif'}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(u)} className="rounded-full hover:bg-[#222222]">
                            <PencilSimple size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(u)} className="rounded-full hover:bg-[#222222]">
                            <TrashSimple size={16} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit User' : 'Tambah User'} variant="slide-right">
        <div className="space-y-5 p-1">
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Nama Lengkap</Label>
            <Input
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              required
              className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">{editing ? 'Password Baru (kosongkan jika tidak diubah)' : 'Password'}</Label>
            <Input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required={!editing}
              className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Role</Label>
            <Select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as User['role'] })}
              className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
          </div>
          <div className="pt-2">
            <Button onClick={handleSave} className="w-full rounded-full h-11">
              {editing ? 'Simpan' : 'Tambah'}
            </Button>
          </div>
        </div>
      </Dialog>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus User"
        message={`Apakah Anda yakin ingin menghapus ${deleteTarget?.full_name}?`}
        variant="danger"
        confirmLabel="Hapus"
      />
    </div>
  )
}
