<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'

import { isExternal } from '@/utils/is'

const router = useRouter()
const permissionStore = usePermissionStore()

const { currentRoute } = router

const menuOptions = computed(() => {
  return generateOptions(permissionStore.routes, '')
})

// 在后台没有处理路由层级得时候需要用到转换
// function resolvePath(basePath, path) {
//   if (isExternal(path)) return path
//   return (
//     '/' +
//     [basePath, path]
//       .filter((path) => !!path && path !== '/')
//       .map((path) => path.replace(/(^\/)|(\/$)/g, ''))
//       .join('/')
//   )
// }

function generateOptions(routes, basePath) {
  let options = []
  routes.forEach((route) => {
    if (route.name && !route.isHidden) {
      let curOption = {
        label: (route.meta && route.meta.title) || route.name,
        key: route.name,
        // path: resolvePath(basePath, route.path),
        path: route.path,
      }
      if (route.children && route.children.length) {
        // curOption.children = generateOptions(route.children, resolvePath(basePath, route.path))
        curOption.children = generateOptions(route.children)
      }
      if (curOption.children && curOption.children.length <= 1) {
        if (curOption.children.length === 1) {
          curOption = { ...curOption.children[0] }
        }
        delete curOption.children
      }
      options.push(curOption)
    }
  })
  return options
}

function handleMenuSelect(key, item) {
  console.log(item, '跳转')
  if (isExternal(item.path)) {
    window.open(item.path)
  } else {
    router.push(item.path)
  }

  // 通过path重定向
  // router.push({
  //   path: '/redirect',
  //   query: { redirect: item.path },
  // })
}
</script>

<template>
  <n-menu
    class="side-menu"
    :root-indent="20"
    :options="menuOptions"
    :value="(currentRoute.meta && currentRoute.meta.activeMenu) || currentRoute.name"
    @update:value="handleMenuSelect"
  />
</template>

<style lang="scss">
.n-menu {
  margin-top: 10px;
  padding-left: 10px;
  .n-menu-item {
    margin-top: 0;
    position: relative;
    &::before {
      left: 0;
      right: 0;
      border-radius: 0;
      background-color: unset !important;
    }

    &:hover,
    &.n-menu-item--selected {
      border-radius: 0 !important;

      &::before {
        border-right: 3px solid $primaryColor;
        background-color: #16243a;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba($primaryColor, 0.3) 100%);
      }
    }
  }

  .n-menu-item-content-header {
    font-size: 14px;
    font-weight: bold;
  }

  .n-submenu-children {
    .n-menu-item-content-header {
      font-size: 14px;
      font-weight: normal;
      position: relative;
      overflow: visible !important;
      &::before {
        content: '';
        position: absolute;
        left: -15px;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        border: 1px solid #333;
      }
    }
  }
}
// .side-menu {
//   // padding-left: 15px;
//   .n-menu-item-content-header {
//     color: #fff !important;
//     font-weight: bold;
//     font-size: 14px;
//   }

//   .n-submenu {
//     .n-menu-item-content-header {
//       color: #fff !important;
//       font-weight: bold;
//       font-size: 14px;
//     }
//   }
//   .n-submenu-children {
//     .n-menu-item-content-header {
//       color: #fff !important;
//       font-weight: normal;
//       font-size: 12px;
//     }
//   }
//   .n-menu-item {
//     border-top-left-radius: 5px;
//     border-bottom-left-radius: 5px;
//     &:hover,
//     &.n-menu-item--selected::before {
//       background-color: #16243a;
//       right: 0;
//       left: 0;
// border-right: 3px solid $primaryColor;
// background-color: unset !important;
// background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba($primaryColor, 0.3) 100%);
//     }
//   }
// }
</style>
