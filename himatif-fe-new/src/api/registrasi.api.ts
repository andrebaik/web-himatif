import api from '@/lib/axios'
import type { ApiResponse, Registrasi } from '@/types'

export async function getAllRegistrasiApi() {
  const res = await api.get<ApiResponse<Registrasi[]>>('/registrasi')
  return res.data
}

export async function createRegistrasiApi(data: Partial<Registrasi>) {
  const res = await api.post<ApiResponse<Registrasi>>('/registrasi', data)
  return res.data
}

export async function deleteRegistrasiApi(id: number) {
  const res = await api.delete<ApiResponse<void>>(`/registrasi/${id}`)
  return res.data
}
