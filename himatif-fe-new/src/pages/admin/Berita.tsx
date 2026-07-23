import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PencilSimple, TrashSimple, Plus, MagnifyingGlass } from '@phosphor-icons/react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog } from '@/components/ui/dialog'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { getAllBeritaApi, createBeritaApi, updateBeritaApi, deleteBeritaApi } from '@/api/berita.api'
import type { Berita } from '@/types'
import { assetUrl } from '@/lib/utils'

const categoryOptions = ['Acara', 'Pengumuman', 'Prestasi', 'Artikel', 'Lainnya']

const categoryBadgeStyle: Record<string, string> = {
  Acara: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  Pengumuman: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  Prestasi: 'bg-green-500/15 text-green-400 border-green-500/20',
  Artikel: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  Lainnya: 'bg-neutral-500/15 text-neutral-400 border-neutral-500/20',
}

export default function AdminBerita() {
  useDocumentTitle('Kelola Berita')
  const [berita, setBerita] = useState<Berita[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Berita | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Berita | null>(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [author, setAuthor] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-orange max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  })

  useEffect(() => {
    loadBerita()
  }, [])

  const loadBerita = () => {
    setLoading(true)
    getAllBeritaApi()
      .then((res) => { if (res.data) setBerita(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  const generateSlug = (t: string) => {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const openCreate = () => {
    setEditing(null)
    setTitle('')
    setSlug('')
    setCategory('')
    setAuthor('')
    setExcerpt('')
    setImageFile(null)
    setImagePreview(null)
    editor?.commands.setContent('')
    setModalOpen(true)
  }

  const openEdit = (b: Berita) => {
    setEditing(b)
    setTitle(b.title)
    setSlug(b.slug)
    setCategory(b.category)
    setAuthor(b.author)
    setExcerpt(b.excerpt)
    setImagePreview(assetUrl(b.image))
    setImageFile(null)
    editor?.commands.setContent(b.content)
    setModalOpen(true)
  }

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!editing) setSlug(generateSlug(val))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSave = async () => {
    const fd = new FormData()
    fd.append('title', title)
    fd.append('slug', slug || generateSlug(title))
    fd.append('category', category)
    fd.append('author', author)
    fd.append('excerpt', excerpt)
    fd.append('content', editor?.getHTML() || '')

    if (imageFile) fd.append('image', imageFile)

    if (editing) {
      await updateBeritaApi(editing.id, fd)
    } else {
      await createBeritaApi(fd)
    }
    setModalOpen(false)
    loadBerita()
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    await deleteBeritaApi(deleteTarget.id)
    setDeleteTarget(null)
    loadBerita()
  }

  const filtered = berita.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]" />
          <Input
            placeholder="Cari berita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 rounded-full bg-[#121212] border-[#222222]/50"
          />
        </div>
        <Button onClick={openCreate} className="rounded-full">
          <Plus size={16} className="mr-2" />Tulis Berita
        </Button>
      </div>

      <div className="bg-[#121212] border border-[#222222]/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#222222]/50">
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Judul</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Kategori</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Penulis</th>
                <th className="text-left p-4 text-[#a3a3a3] font-medium">Tanggal</th>
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
                  {filtered.map((b, i) => (
                    <motion.tr
                      key={b.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03, ease: [0.32, 0.72, 0, 1] }}
                      className="border-b border-[#222222]/30 hover:bg-[#1a1a1a]/50 transition-colors"
                    >
                      <td className="p-4">
                        <span className="font-medium text-[#fafafa]">{b.title}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={`border ${categoryBadgeStyle[b.category] || 'bg-neutral-500/15 text-neutral-400 border-neutral-500/20'}`}>
                          {b.category}
                        </Badge>
                      </td>
                      <td className="p-4 text-[#a3a3a3]">{b.author}</td>
                      <td className="p-4 text-[#a3a3a3]">
                        {new Date(b.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(b)} className="rounded-full hover:bg-[#222222]">
                            <PencilSimple size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(b)} className="rounded-full hover:bg-[#222222]">
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

      <Dialog isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Berita' : 'Tulis Berita'} variant="slide-right">
        <div className="space-y-5 p-1">
          {imagePreview && (
            <div className="rounded-xl overflow-hidden border border-[#222222]/50">
              <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover" />
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Gambar</Label>
            <Input type="file" accept="image/*" ref={fileRef} onChange={handleImageChange} className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl file:text-[#a3a3a3]" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Judul</Label>
            <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} required className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Slug</Label>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated" className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl text-[#a3a3a3]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">Kategori</Label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)} required className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl">
                <option value="">Pilih kategori</option>
                {categoryOptions.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-[#a3a3a3]">Penulis</Label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} required className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Excerpt</Label>
            <Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Ringkasan singkat" className="bg-[#1a1a1a] border-[#222222]/50 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-[#a3a3a3]">Konten</Label>
            <div className="border border-[#222222] rounded-xl overflow-hidden bg-[#1a1a1a]">
              <div className="flex flex-wrap gap-1 p-2 border-b border-[#222222] bg-[#1a1a1a]">
                <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className="px-3 py-1.5 rounded-lg text-sm hover:bg-[#222222] text-[#a3a3a3] hover:text-[#fafafa] font-bold transition-colors">B</button>
                <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className="px-3 py-1.5 rounded-lg text-sm hover:bg-[#222222] text-[#a3a3a3] hover:text-[#fafafa] italic transition-colors">I</button>
                <button type="button" onClick={() => editor?.chain().focus().toggleUnderline().run()} className="px-3 py-1.5 rounded-lg text-sm hover:bg-[#222222] text-[#a3a3a3] hover:text-[#fafafa] underline transition-colors">U</button>
                <span className="w-px bg-[#222222]" />
                <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="px-3 py-1.5 rounded-lg text-sm hover:bg-[#222222] text-[#a3a3a3] hover:text-[#fafafa] transition-colors">H2</button>
                <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className="px-3 py-1.5 rounded-lg text-sm hover:bg-[#222222] text-[#a3a3a3] hover:text-[#fafafa] transition-colors">H3</button>
                <span className="w-px bg-[#222222]" />
                <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="px-3 py-1.5 rounded-lg text-sm hover:bg-[#222222] text-[#a3a3a3] hover:text-[#fafafa] transition-colors">List</button>
                <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className="px-3 py-1.5 rounded-lg text-sm hover:bg-[#222222] text-[#a3a3a3] hover:text-[#fafafa] transition-colors">Quote</button>
                <span className="w-px bg-[#222222]" />
                {['left', 'center', 'right'].map((align) => (
                  <button
                    key={align}
                    type="button"
                    onClick={() => editor?.chain().focus().setTextAlign(align).run()}
                    className="px-3 py-1.5 rounded-lg text-sm hover:bg-[#222222] text-[#a3a3a3] hover:text-[#fafafa] capitalize transition-colors"
                  >
                    {align}
                  </button>
                ))}
              </div>
              <EditorContent editor={editor} />
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
        title="Hapus Berita"
        message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.title}"?`}
        variant="danger"
        confirmLabel="Hapus"
      />
    </div>
  )
}
