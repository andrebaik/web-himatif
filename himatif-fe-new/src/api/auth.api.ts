import api from '@/lib/axios'
import type { ApiResponse, User } from '@/types'

export async function loginApi(email: string, password: string) {
  const res = await api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', { email, password })
  return res.data
}
