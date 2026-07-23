import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrashSimple, Download, MagnifyingGlass } from '@phosphor-icons/react'
import * as XLSX from 'xlsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getAllRegistrasiApi, deleteRegistrasiApi } from '@/api/registrasi.api'
import type { Registrasi } from '@/types'

const statusBadgeStyle: Record<string, string> = {
  approved: 'bg-green-500/15 text-green-400 border-green-500/20',
  pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  rejected: 'bg-red-500/15 text-red-400 border-red-500/20',
}

export default function AdminRegistrasi() {
  useDocumentTitle('Pendaftaran')
  const { user } = useAuth()
  const [registrasi, setRegistrasi] = useState<Registrasi[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Registrasi | null>(null)

  useEffect(() => {
    loadRegistrasi()
  }, [])

  const loadRegistrasi = () => {
    setLoading(true)
    getAllRegistrasiApi()
      .then((res) => { if (res.data) setRegistrasi(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteRegistrasiApi(deleteTarget.id)
    setDeleteTarget(null)
    loadRegistrasi()
  }

  const exportExcel = () => {
    const data = filtered.map((r) => ({
      'Nama Lengkap': r.nama_lengkap,
      'NIM': r.nim,
      'Angkatan': r.angkatan,
      'Kelas': r.kelas,
      'Email': r.email,
      'No. WhatsApp': r.no_whatsapp,
      'Alasan Bergabung': r.alasan_bergabung,
      'Status': r.status,
      'Tanggal Daftar': r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID') : '',
    }))

    const ws = XLSX.utils.json_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Pendaftaran')
    XLSX.writeFile(wb, `pendaftaran-himatif-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const canDelete = user?.role !== 'informasi'

  const filtered = registrasi.filter((r) =>
    r.nama_lengkap.toLowerCase().includes(search.toLowerCase()) ||
    r.nim.includes(search) ||
    r.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
          <Input
            placeholder="Cari pendaftar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-full bg-[#121212] border-[#222222]/50"
          />
        </div>
        <Button variant="outline" onClick={exportExcel} className="rounded-full border-[#222222]/50 bg-[#121212] hover:bg-[#1a1a1a]">
          <Download size={16} className="mr-2" />
          Export Excel
        </Button>
      </div>

      <div className="bg-[#121212] border border-[#222222]/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#222222]/50">
                <th className="text-left p-4 text-[#a3a3a3] font-medium">No</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Nama</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">NIM</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Angkatan</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Kelas</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Email</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">WA</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Status</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Tanggal</th>
                {canDelete && <th className="text-right p-4 text-[#a3a3a3] font-medium">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={canDelete ? 10 : 9} className="p-8 text-center text-[#a3a3a3]">Memuat...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={canDelete ? 10 : 9} className="p-8 text-center text-[#a3a3a3]">Tidak ada data.</td></tr>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filtered.map((r, i) => (
                    <motion.tr
                      key={r.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.02, ease: [0.32, 0.72, 0, 1] }}
                      className="border-b border-[#222222]/30 hover:bg-[#1a1a1a]/50 transition-colors"
                    >
                      <td className="p-4 text-[#a3a3a3]">{i + 1}</td>
                      <td className="p-4 font-medium text-[#fafafa]">{r.nama_lengkap}</td>
                      <td className="p-4 text-[#a3a3a3]">{r.nim}</td>
                      <td className="p-4 text-[#a3a3a3]">{r.angkatan}</td>
                      <td className="p-4 text-[#a3a3a3]">{r.kelas}</td>
                      <td className="p-4 text-[#a3a3a3]">{r.email}</td>
                      <td className="p-4 text-[#a3a3a3]">{r.no_whatsapp}</td>
                      <td className="p-4">
                        <Badge className={`border ${statusBadgeStyle[r.status] || 'bg-neutral-500/15 text-neutral-400 border-neutral-500/20'}`}>
                          {r.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-[#a3a3a3] text-xs">
                        {r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : '-'}
                      </td>
                      {canDelete && (
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(r)} className="rounded-full hover:bg-[#222222]">
                            <TrashSimple size={16} />
                          </Button>
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Pendaftar"
        message={`Apakah Anda yakin ingin menghapus pendaftaran ${deleteTarget?.nama_lengkap}?`}
        variant="danger"
        confirmLabel="Hapus"
      />
    </div>
  )
}
