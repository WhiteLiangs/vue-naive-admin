import { defineStore } from 'pinia'
import { getUser, fetchUserRoutes } from '@/api/user'
import { removeToken } from '@/utils/token'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
      roleList: [],
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await getUser()
        if (res.code === 0) {
          const { id, name, avatar_url } = res.data
          this.userInfo = { id, name, avatar_url }
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res.message)
        }
      } catch (error) {
        console.error(error)
        return Promise.reject(error.message)
      }
    },
    async getRoles() {
      try {
        const res = await fetchUserRoutes()
        if (res.code === 0) {
          const { auth_list } = res.data
          this.roleList = auth_list
          return Promise.resolve(res.data)
        } else {
          return Promise.reject(res.message)
        }
      } catch (error) {
        console.error(error)
        return Promise.reject(error.message)
      }
    },
    logout() {
      removeToken()
      this.userInfo = {}
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})
