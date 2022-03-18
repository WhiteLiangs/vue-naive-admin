import { defineStore } from 'pinia'
import { asyncRoutes, basicRoutes } from '@/router/routes'
import Layout from '@/layout/index.vue'
import { FlatToTree } from '@/utils'
// function hasPermission(route, role) {
//   const routeRole = route.meta?.role ? route.meta.role : []
//   if (!role.length || !routeRole.length) {
//     return false
//   }
//   return role.some((item) => routeRole.includes(item))
// }
// export const loadView = (view) => {
//   return defineAsyncComponent(() => import(`@/view${view}.vue`))
// }
const modules = import.meta.glob('../../views/*/*.vue')
export function filterAsyncRoutes(role) {
  const ret = FlatToTree(role)
  const async = ret.filter((route) => {
    if (route.component == 'Layout') {
      route.component = Layout
      if (route.children) {
        route.children.forEach((item) => {
          item.component = modules[`../../views${item.component}.vue`]
        })
        return true
      }
      return true
    }
    return true
  })

  return async
}

export const usePermissionStore = defineStore('permission', {
  state() {
    return {
      accessRoutes: [],
    }
  },
  getters: {
    routes() {
      return basicRoutes.concat(this.accessRoutes)
    },
  },
  actions: {
    generateRoutes(role = []) {
      const accessRoutes = filterAsyncRoutes(role)
      this.accessRoutes = accessRoutes
      return accessRoutes
    },
  },
})
