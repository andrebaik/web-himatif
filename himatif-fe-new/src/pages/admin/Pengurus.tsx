import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PencilSimple, TrashSimple, Plus, MagnifyingGlass } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getAllPengurusApi, createPengurusApi, updatePengurusApi, deletePengurusApi } from '@/api/pengurus.api'
import { getAllDivisiApi } from '@/api/divisi.api'
import type { Pengurus, Divisi } from '@/types'
import { assetUrl } from '@/lib/utils'

const initialForm = {
  nama: '', nama_panggilan: '', jabatan: '', kutipan: '',
  instagram: '', linkedin: '', github: '', status: 'aktif' as Pengurus['status'],
  periode: '', divisi_id: '',
}

export default function AdminPengurus() {
  useDocumentTitle('Kelola Pengurus')
  const [pengurus, setPengurus] = useState<Pengurus[]>([])
  const [divisiList, setDivisiList] = useState<Divisi[]>([])
  const [search, setSearch] = useState('')
  const [divisiFilter, setDivisiFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Pengurus | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Pengurus | null>(null)
  const [form, setForm] = useState(initialForm)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Promise.all([loadPengurus(), loadDivisi()])
  }, [])

  const loadPengurus = () => {
    setLoading(true)
    getAllPengurusApi()
      .then((res) => { if (res.data) setPengurus(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const loadDivisi = () => {
    getAllDivisiApi()
      .then((res) => { if (res.data) setDivisiList(res.data) })
      .catch(() => {})
  }

  const openCreate = () => {
    setEditing(null)
    setForm(initialForm)
    setPhotoFile(null)
    setPreview(null)
    setModalOpen(true)
  }

  const openEdit = (p: Pengurus) => {
    setEditing(p)
    setForm({
      nama: p.nama, nama_panggilan: p.nama_panggilan || '', jabatan: p.jabatan,
      kutipan: p.kutipan || '', instagram: p.instagram || '', linkedin: p.linkedin || '', github: p.github || '',
      status: p.status, periode: p.periode, divisi_id: p.divisi_id?.toString() || '',
    })
    setPreview(assetUrl(p.foto))
    setPhotoFile(null)
    setModalOpen(true)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    const fd = new FormData()
    fd.append('nama', form.nama)
    if (form.nama_panggilan) fd.append('nama_panggilan', form.nama_panggilan)
    fd.append('jabatan', form.jabatan)
    if (form.kutipan) fd.append('kutipan', form.kutipan)
    if (form.instagram) fd.append('instagram', form.instagram)
    if (form.linkedin) fd.append('linkedin', form.linkedin)
    if (form.github) fd.append('github', form.github)
    fd.append('status', form.status)
    fd.append('periode', form.periode)
    if (form.divisi_id) fd.append('divisi_id', form.divisi_id)

    if (photoFile) fd.append('foto', photoFile)

    if (editing) {
      await updatePengurusApi(editing.id, fd)
    } else {
      await createPengurusApi(fd)
    }
    setModalOpen(false)
    loadPengurus()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deletePengurusApi(deleteTarget.id)
    setDeleteTarget(null)
    loadPengurus()
  }

  const filtered = pengurus.filter((p) => {
    const matchSearch = !search || p.nama.toLowerCase().includes(search.toLowerCase()) || p.jabatan.toLowerCase().includes(search.toLowerCase())
    const matchDivisi = !divisiFilter || p.divisi_id?.toString() === divisiFilter
    return matchSearch && matchDivisi
  })

  const getFotoUrl = (foto?: string) => assetUrl(foto)

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-1 gap-2 w-full sm:max-w-md">
          <div className="relative flex-1">
            <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
            <Input
              placeholder="Cari pengurus..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-full bg-[#121212] border-[#222222]/50"
            />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1">
            <button
              onClick={() => setDivisiFilter('')}
              className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                divisiFilter === ''
                  ? 'bg-[#f97316] text-[#0c0c0c] border-[#f97316] font-medium'
                  : 'bg-[#121212] text-[#a3a3a3] border-[#222222]/50 hover:text-[#fafafa]'
              }`}
            >
              Semua
            </button>
            {divisiList.map((d) => (
              <button
                key={d.id}
                onClick={() => setDivisiFilter(d.id.toString())}
                className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                  divisiFilter === d.id.toString()
                    ? 'bg-[#f97316] text-[#0c0c0c] border-[#f97316] font-medium'
                    : 'bg-[#121212] text-[#a3a3a3] border-[#222222]/50 hover:text-[#fafafa]'
                }`}
              >
                {d.nama_divisi}
              </button>
            ))}
          </div>
          <Button onClick={openCreate} className="rounded-full shrink-0">
            <Plus size={16} className="mr-2" />Tambah Pengurus
          </Button>
        </div>
      </div>

      <div className="bg-[#121212] border border-[#222222]/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#222222]/50">
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Foto</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Nama</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Jabatan</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Divisi</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Status</th>
                <th className="text-right p-4 text-[#a3a3a3] font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-[#a3a3a3]">Memuat...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-[#a3a3a3]">Tidak ada data.</td></tr>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filtered.map((p, i) => {
                    const url = getFotoUrl(p.foto)
                    return (
                      <motion.tr
                        key={p.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.03, ease: [0.32, 0.72, 0, 1] }}
                        className="border-b border-[#222222]/30 hover:bg-[#1a1a1a]/50 transition-colors"
                      >
                        <td className="p-4">
                          {url ? (
                            <img src={url} alt={p.nama} className="w-10 h-10 rounded-full object-cover ring-1 ring-[#222222]" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-xs text-[#a3a3a3] ring-1 ring-[#222222]">
                              {p.nama.charAt(0)}
                            </div>
                          )}
                        </td>
                        <td className="p-4"><span className="font-medium text-[#fafafa]">{p.nama}</span></td>
                        <td className="p-4 text-[#a3a3a3]">{p.jabatan}</td>
                        <td className="p-4 text-[#a3a3a3]">{p.nama_divisi || '-'}</td>
                        <td className="p-4">
                          <Badge className={`border ${p.status === 'aktif' ? 'bg-green-500/15 text-green-400 border-green-500/20' : 'bg-neutral-500/15 text-neutral-400 border-neutral-500/20'}`}>
                            {p.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={() => openEdit(p)} className="rounded-full hover:bg-[#222222]">
                              <PencilSimple size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(p)} className="rounded-full hover:bg-[#222222]">
                              <TrashSimple size={16} />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Pengurus' : 'Tambah Pengurus'} variant="slide-right">
        <div className="space-y-5 p-1">
          {preview && (
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#222222]">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Foto</Label>
            <Input type="file" accept="image/*" ref={fileRef} onChange={handlePhotoChange} className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl file:text-[#a3a3a3]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">Nama Lengkap</Label>
              <Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} required className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">Nama Panggilan</Label>
              <Input value={form.nama_panggilan} onChange={(e) => setForm({ ...form, nama_panggilan: e.target.value })} className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">Jabatan</Label>
              <Input value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} required className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">Periode</Label>
              <Input value={form.periode} onChange={(e) => setForm({ ...form, periode: e.target.value })} placeholder="2024/2025" required className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Divisi</Label>
            <Select value={form.divisi_id} onChange={(e) => setForm({ ...form, divisi_id: e.target.value })} className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl">
              <option value="">Tidak ada divisi</option>
              {divisiList.map((d) => (
                <option key={d.id} value={d.id.toString()}>{d.nama_divisi}</option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Status</Label>
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Pengurus['status'] })} className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl">
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Kutipan</Label>
            <Textarea value={form.kutipan} onChange={(e) => setForm({ ...form, kutipan: e.target.value })} rows={2} className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">Instagram</Label>
              <Input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} placeholder="username" className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">LinkedIn</Label>
              <Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/in/username" className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">GitHub URL</Label>
              <Input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/username" className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
            </div>
          </div>
          <div className="pt-2">
            <Button onClick={handleSave} className="w-full rounded-full h-11">{editing ? 'Simpan' : 'Tambah'}</Button>
          </div>
        </div>
      </Dialog>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Pengurus"
        message={`Apakah Anda yakin ingin menghapus ${deleteTarget?.nama}?`}
        variant="danger"
        confirmLabel="Hapus"
      />
    </div>
  )
}
