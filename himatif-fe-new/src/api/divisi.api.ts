import api from '@/lib/axios'
import type { ApiResponse, Divisi } from '@/types'

export async function getAllDivisiApi() {
  const res = await api.get<ApiResponse<Divisi[]>>('/divisi')
  return res.data
}
