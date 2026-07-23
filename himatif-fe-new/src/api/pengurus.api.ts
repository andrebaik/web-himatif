import api from '@/lib/axios'
import type { ApiResponse, Pengurus } from '@/types'

export async function getAllPengurusApi() {
  const res = await api.get<ApiResponse<Pengurus[]>>('/pengurus')
  return res.data
}

export async function createPengurusApi(data: FormData) {
  const res = await api.post<ApiResponse<Pengurus>>('/pengurus', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export async function updatePengurusApi(id: number, data: FormData) {
  const res = await api.post<ApiResponse<Pengurus>>(`/pengurus/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export async function deletePengurusApi(id: number) {
  const res = await api.delete<ApiResponse<void>>(`/pengurus/${id}`)
  return res.data
}
