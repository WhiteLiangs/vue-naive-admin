import { request } from '@/utils/http'

export const login = (data) => {
  return request({
    url: '/admin/Admin/login',
    method: 'post',
    data,
  })
}

export const refreshToken = () => {
  return request({
    url: '/auth/refreshToken',
    method: 'post',
  })
}
