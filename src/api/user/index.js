import { request } from '@/utils/http'

// 获取用户信息
export function getUser() {
  return request({
    url: '/admin/Admin/getAdminInfo',
    method: 'post',
  })
}

// 获取用户权限
export function fetchUserRoutes() {
  return request({
    url: '/admin/Admin/getInitialState',
    method: 'post',
  })
}

// 获取数据总览
export function getStatisticsData() {
  return request({
    url: '/admin/ProjectStatistics/getStatisticsData',
    method: 'post',
  })
}

// 获取数据总览
export function getLoginTableData(data) {
  return request({
    url: '/admin/ProjectStatistics/getLoginTableData',
    method: 'post',
    data,
  })
}

//获取登录排名
export function getLoginTimeTopData(data) {
  return request({
    url: 'admin/ProjectStatistics/getLoginTimeTopData',
    method: 'post',
    data,
  })
}

// 获取城市数据
export function getProjectCityData() {
  return request({
    url: 'admin/ProjectStatistics/getProjectCityData',
    method: 'post',
  })
}
