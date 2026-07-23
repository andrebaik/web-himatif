import api from '@/lib/axios'
import type { ApiResponse, User } from '@/types'

export async function getAllUsersApi() {
  const res = await api.get<ApiResponse<User[]>>('/users')
  return res.data
}

export async function getUserByIdApi(id: number) {
  const res = await api.get<ApiResponse<User>>(`/users/${id}`)
  return res.data
}

export async function createUserApi(data: Partial<User>) {
  const res = await api.post<ApiResponse<User>>('/users', data)
  return res.data
}

export async function updateUserApi(id: number, data: Partial<User>) {
  const res = await api.put<ApiResponse<User>>(`/users/${id}`, data)
  return res.data
}

export async function deleteUserApi(id: number) {
  const res = await api.delete<ApiResponse<void>>(`/users/${id}`)
  return res.data
}
