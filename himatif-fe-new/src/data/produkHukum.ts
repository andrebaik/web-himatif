export interface ProdukHukum {
  id: number
  title: string
  description?: string
  file: string // path relatif dari public/, mis. '/pdf/anggaran-dasar.pdf'
  date?: string
}

// Daftar Produk Hukum. Tambahkan entri baru di sini, dan taruh file PDF di folder public/pdf/.
export const produkHukum: ProdukHukum[] = [
  {
    id: 1,
    title: 'Anggaran Dasar HIMATIF',
    description: 'Dokumen dasar organisasi HIMATIF ITG.',
    file: '/pdf/anggaran-dasar.pdf',
    date: '2024-01-01',
  },
]
