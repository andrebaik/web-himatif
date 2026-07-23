export interface User {
  user_id: number
  email: string
  full_name: string
  role: 'super_admin' | 'admin' | 'teknologi' | 'informasi'
  is_active?: boolean
  created_at?: string
  updated_at?: string
}

export interface Berita {
  id: number
  slug: string
  title: string
  image?: string
  category: string
  date: string
  author: string
  excerpt: string
  content: string
  created_at?: string
  updated_at?: string
}

export interface Divisi {
  id: number
  nama_divisi: string
  deskripsi?: string
  created_at?: string
  updated_at?: string
}

export interface Pengurus {
  id: number
  nama: string
  nama_panggilan?: string
  jabatan: string
  foto?: string
  kutipan?: string
  instagram?: string
  linkedin?: string
  status: 'aktif' | 'nonaktif'
  periode: string
  divisi_id?: number
  divisi?: Divisi
  nama_divisi?: string
  created_at?: string
  updated_at?: string
}

export interface Registrasi {
  id: number
  nama_lengkap: string
  nim: string
  angkatan: string
  kelas: string
  email: string
  no_whatsapp: string
  alasan_bergabung: string
  status: string
  created_at?: string
}

export interface RegistrationSettings {
  id: number
  registration_open: string
  registration_close: string
  is_active: boolean
}

export interface RegistrationStatus {
  status: 'open' | 'not_started' | 'closed' | 'inactive' | 'not_configured'
  message: string
  registration_open?: string
  registration_close?: string
}

export interface ApiResponse<T> {
  statusCode: number
  message: string
  data?: T
}
