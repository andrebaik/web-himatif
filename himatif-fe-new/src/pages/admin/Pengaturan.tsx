import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarBlank, Clock } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getSettingsApi, updateSettingsApi, getStatusApi } from '@/api/settings.api'
import type { RegistrationStatus } from '@/types'

export default function Pengaturan() {
  useDocumentTitle('Pengaturan')
  const [status, setStatus] = useState<RegistrationStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    registration_open: '',
    registration_close: '',
    is_active: false,
  })

  useEffect(() => {
    Promise.all([loadSettings(), loadStatus()])
  }, [])

  const loadSettings = () => {
    getSettingsApi()
      .then((res) => {
        if (res.data) {
          setForm({
            registration_open: res.data.registration_open
              ? new Date(res.data.registration_open).toISOString().slice(0, 16)
              : '',
            registration_close: res.data.registration_close
              ? new Date(res.data.registration_close).toISOString().slice(0, 16)
              : '',
            is_active: res.data.is_active,
          })
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const loadStatus = () => {
    getStatusApi()
      .then((res) => { if (res.data) setStatus(res.data) })
      .catch(() => {})
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateSettingsApi({
        registration_open: new Date(form.registration_open).toISOString(),
        registration_close: new Date(form.registration_close).toISOString(),
        is_active: form.is_active,
      })
      await Promise.all([loadSettings(), loadStatus()])
    } catch {}
    setSaving(false)
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    open: { label: 'Terbuka', color: 'bg-green-500/15 text-green-400 border-green-500/20' },
    closed: { label: 'Tertutup', color: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/20' },
    not_started: { label: 'Belum Dimulai', color: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
    inactive: { label: 'Tidak Aktif', color: 'bg-red-500/15 text-red-400 border-red-500/20' },
    not_configured: { label: 'Belum Dikonfigurasi', color: 'bg-red-500/15 text-red-400 border-red-500/20' },
  }

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      >
        <h1 className="text-xl font-bold text-[#fafafa] mb-1">Pengaturan</h1>
        <p className="text-sm text-[#a3a3a3]">Atur pendaftaran anggota baru</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
        className="bg-[#121212] border border-[#222222]/50 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-[#fafafa]">Status Pendaftaran</h2>
            <p className="text-sm text-[#a3a3a3]">Status terkini pendaftaran anggota baru</p>
          </div>
          {!loading && status && (
            <Badge className={`border ${statusConfig[status.status]?.color || 'bg-neutral-500/15 text-neutral-400 border-neutral-500/20'}`}>
              {statusConfig[status.status]?.label || status.status}
            </Badge>
          )}
        </div>
        {loading ? (
          <div className="h-12 bg-[#1a1a1a] rounded-xl animate-pulse" />
        ) : status ? (
          <div className="space-y-2">
            <p className="text-sm text-[#a3a3a3]">{status.message}</p>
            <div className="flex gap-6 text-sm">
              {status.registration_open && (
                <div className="flex items-center gap-2 text-[#a3a3a3]">
                  <CalendarBlank size={14} />
                  <span>Buka: {new Date(status.registration_open).toLocaleString('id-ID')}</span>
                </div>
              )}
              {status.registration_close && (
                <div className="flex items-center gap-2 text-[#a3a3a3]">
                  <Clock size={14} />
                  <span>Tutup: {new Date(status.registration_close).toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-[#a3a3a3]">Gagal memuat status.</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        className="bg-[#121212] border border-[#222222]/50 rounded-2xl p-6"
      >
        <h2 className="text-base font-semibold text-[#fafafa] mb-1">Pengaturan Pendaftaran</h2>
        <p className="text-sm text-[#a3a3a3] mb-5">Atur jadwal buka-tutup dan status pendaftaran</p>

        {loading ? (
          <div className="space-y-4">
            <div className="h-10 bg-[#1a1a1a] rounded-xl animate-pulse" />
            <div className="h-10 bg-[#1a1a1a] rounded-xl animate-pulse" />
          </div>
        ) : (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">Tanggal Buka Pendaftaran</Label>
              <Input
                type="datetime-local"
                value={form.registration_open}
                onChange={(e) => setForm({ ...form, registration_open: e.target.value })}
                className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">Tanggal Tutup Pendaftaran</Label>
              <Input
                type="datetime-local"
                value={form.registration_close}
                onChange={(e) => setForm({ ...form, registration_close: e.target.value })}
                className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label className="text-sm text-[#fafafa] font-medium">Aktifkan Pendaftaran</Label>
                <p className="text-xs text-[#a3a3a3]">Biarkan anggota baru mendaftar</p>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, is_active: !form.is_active })}
                className={`relative w-12 h-6 rounded-full transition-colors flex items-center px-0.5 ${
                  form.is_active ? 'bg-[#f97316]' : 'bg-[#222222]'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                  form.is_active ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full rounded-full h-11">
              {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  )
}
