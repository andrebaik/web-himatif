import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Bangun URL absolut ke asset backend (gambar) dengan normalisasi slash.
// Menghindari hasil seperti "http://localhost:4000image/..." saat base tidak
// punya trailing slash dan path tidak punya leading slash.
export function assetUrl(path?: string | null): string | null {
  if (!path) return null
  const base = (import.meta.env.VITE_API_URL || "http://localhost:4000").replace(/\/$/, "")
  const p = path.replace(/^\//, "")
  return `${base}/${p}`
}
