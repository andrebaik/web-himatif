import api from '@/lib/axios'
import type { ApiResponse, Berita } from '@/types'

export async function getAllBeritaApi() {
  const res = await api.get<ApiResponse<Berita[]>>('/berita')
  return res.data
}

export async function getBeritaByIdApi(id: number) {
  const res = await api.get<ApiResponse<Berita>>(`/berita/${id}`)
  return res.data
}

export async function getBeritaBySlugApi(slug: string) {
  const res = await api.get<ApiResponse<Berita>>(`/berita/slug/${slug}`)
  return res.data
}

export async function createBeritaApi(data: FormData) {
  const res = await api.post<ApiResponse<Berita>>('/berita', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export async function updateBeritaApi(id: number, data: FormData) {
  const res = await api.post<ApiResponse<Berita>>(`/berita/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export async function deleteBeritaApi(id: number) {
  const res = await api.delete<ApiResponse<void>>(`/berita/${id}`)
  return res.data
}
