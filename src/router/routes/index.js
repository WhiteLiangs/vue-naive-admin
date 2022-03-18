import Layout from '@/layout/index.vue'
// import CenterConsole from '@/views/CenterConsole/Overview'

export const basicRoutes = [
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    isHidden: true,
  },
  {
    name: 'REDIRECT',
    path: '/redirect',
    component: Layout,
    isHidden: true,
    children: [
      {
        name: 'REDIRECT_NAME',
        path: '',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
  {
    name: 'LOGIN',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录页',
    },
  },

  {
    name: 'HOME',
    path: '/',
    component: Layout,
    redirect: '/CenterConsole/Overview',
    meta: {
      title: '首页',
    },
    isHidden: true,
  },
]

export const NOT_FOUND_ROUTE = {
  name: 'NOT_FOUND',
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  isHidden: true,
}

const modules = import.meta.globEager('./modules/*.js')
const asyncRoutes = []
Object.keys(modules).forEach((key) => {
  asyncRoutes.push(...modules[key].default)
})

export { asyncRoutes }
