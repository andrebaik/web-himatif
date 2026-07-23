# HIMATIF Frontend

Frontend website HIMATIF ITG. Dibangun dengan **React 19 + TypeScript + Vite + Tailwind CSS 4**.

## Tech Stack
- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- React Router 7
- Axios (API layer di `src/api`)
- Framer Motion + GSAP (animasi), Swiper (slider), TipTap (rich text)

## Prerequisites
- Node.js 18+

## Setup

1. Install dependencies
   ```bash
   npm install
   ```

2. Buat file `.env` (opsional, ada default)
   ```
   VITE_API_URL=http://localhost:4000
   ```
   Jika tidak diisi, default mengarah ke `http://localhost:4000`.

3. Pastikan backend (`himatif-be-new`) sudah jalan dan database ter-import.

## Menjalankan

```bash
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # type-check + build produksi
npm run preview  # preview hasil build
npm run lint     # oxlint
```

## Struktur
```
src/
  api/         panggilan ke backend per modul
  components/  ui/, layout/, common/
  context/     AuthContext (global auth state)
  hooks/       useDocumentTitle
  lib/         axios instance + utils
  pages/       public + admin pages
  types/       shared TypeScript types
```

## Role
User memiliki role: `super_admin`, `admin`, `teknologi`, `informasi`
(lihat `src/types/index.ts`). Akses menu admin difilter di `AdminSidebar`.
