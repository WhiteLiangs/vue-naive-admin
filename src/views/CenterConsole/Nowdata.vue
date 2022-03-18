<template>
  <div class="box">
    <n-card
      title="全国实时数据"
      :segmented="{
        content: true,
      }"
    >
      <mapData></mapData
    ></n-card>
    <n-card
      :segmented="{
        content: true,
      }"
      class="cat"
      title="总体回复率"
    >
      <div ref="container"></div>
    </n-card>
  </div>
</template>

<script setup>
import mapData from './components/mapData.vue'
const container = ref()
const contain = ref()
import { Gauge } from '@antv/g2plot'
function renderLineChart(data) {
  contain.value = new Gauge(container.value, {
    percent: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#F4664A', '#FAAD14', '#30BF78'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: '36px',
          lineHeight: '36px',
        },
      },
    },
  })
  contain.value.render()
}

onMounted(() => {
  renderLineChart()
})
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
}
.n-card {
  min-width: 100px;
  width: 65%;
  // margin: 20px 0px 0 0;
  height: 680px;
  // row-gap: 16px;
  display: flex;
  // align-items: center;
}

.cat {
  width: 34%;
  height: 680px;
}
</style>
