import { Link } from 'react-router-dom'
import { ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Halaman Tidak Ditemukan')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-foreground mb-2">Halaman Tidak Ditemukan</h2>
        <p className="text-muted-foreground mb-8">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link to="/">
          <Button>
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  )
}
