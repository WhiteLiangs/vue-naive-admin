<template>
  <div class="box">4</div>
</template>

<script lang="ts">
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
export default {
  setup() {
    console.log('1-开始创建组件-setup')

    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount')
    })
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted')
    })
  },
}
</script>
<style lang="scss" scoped>
.box {
  background-color: #ffffff;
}
</style>
