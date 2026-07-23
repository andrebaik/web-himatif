import api from '@/lib/axios'
import type { ApiResponse, RegistrationSettings, RegistrationStatus } from '@/types'

export async function getSettingsApi() {
  const res = await api.get<ApiResponse<RegistrationSettings>>('/registration-settings')
  return res.data
}

export async function updateSettingsApi(data: Partial<RegistrationSettings>) {
  const res = await api.put<ApiResponse<RegistrationSettings>>('/registration-settings', data)
  return res.data
}

export async function getStatusApi() {
  const res = await api.get<ApiResponse<RegistrationStatus>>('/registration-settings/status')
  return res.data
}
