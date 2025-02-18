import { useUserStore } from '@/store/modules/user'
import { usePermissionStore } from '@/store/modules/permission'
import { NOT_FOUND_ROUTE } from '@/router/routes'
import { getToken, refreshAccessToken, removeToken } from '@/utils/token'
import user from '../routes/modules/user'

const WHITE_LIST = ['/login', '/redirect']
export function createPermissionGuard(router) {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  router.beforeEach(async (to, from, next) => {
    const token = getToken()
    if (token) {
      if (to.path === '/login') {
        next({ path: '/' })
        // next({ ...to, replace: true })
      } else {
        if (userStore.userId) {
          // 已经拿到用户信息
          // refreshAccessToken()
          next()
        } else {
          try {
            await userStore.getUserInfo()
            await userStore.getRoles()
            const accessRoutes = permissionStore.generateRoutes(userStore.roleList)
            accessRoutes.forEach((route) => {
              !router.hasRoute(route.name) && router.addRoute(route)
            })
            router.addRoute(NOT_FOUND_ROUTE)
            next({ ...to, replace: true })
          } catch (error) {
            removeToken()
            $message.error(error)
            next({ path: '/login', query: { ...to.query, redirect: to.path } })
          }
        }
      }
    } else {
      if (WHITE_LIST.includes(to.path)) {
        next()
      } else {
        next({ path: '/login', query: { ...to.query, redirect: to.path } })
      }
    }
  })
}
