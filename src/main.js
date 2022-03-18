import '@/styles/index.scss'
import 'uno.css'
// import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import App from './App.vue'
import dayjs from 'dayjs'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

async function bootstrap() {
  const app = createApp(App)
  // app.config.globalProperties.$dayjs = dayjs
  setupStore(app)
  setupRouter(app)
  window.$dayjs = dayjs
  app.mount('#app', true)
}

bootstrap()
