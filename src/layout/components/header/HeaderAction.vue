<script setup>
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { resetRouter } from '@/router'
import { usePermissionStore } from '@/store/modules/permission'
import { NOT_FOUND_ROUTE } from '@/router/routes'

const userStore = useUserStore()
const router = useRouter()

const options = [
  {
    label: '切换角色',
    key: 'switchRole',
  },
  {
    label: '退出登录',
    key: 'logout',
  },
]

function handleSelect(key) {
  if (key === 'logout') {
    logout()
  } else if (key === 'switchRole') {
    switchRole()
  }
}

function logout() {
  userStore.logout()
  $message.success('已退出登录')
  router.push({ path: '/login' })
}

function switchRole() {
  const permissionStore = usePermissionStore()

  const users = []

  const switchUser = users[+userStore.userId % users.length]
  resetRouter()
  userStore.setUserInfo(switchUser)
  const accessRoutes = permissionStore.generateRoutes(switchUser.role)
  accessRoutes.forEach((route) => {
    !router.hasRoute(route.name) && router.addRoute(route)
  })
  router.addRoute(NOT_FOUND_ROUTE)
  $message.success(`${switchUser.name}`)
}
</script>

<template>
  <n-dropdown :options="options" @select="handleSelect">
    <div class="avatar">
      <img :src="userStore.avatar" />
      <span>{{ userStore.name }}</span>
    </div>
  </n-dropdown>
</template>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 100%;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
