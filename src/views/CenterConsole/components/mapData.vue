<template>
  <div class="hello">
    <!-- echarts 初始化 -->
    <div ref="mapbox" class="content"></div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import 'echarts/map/js/china.js'
import { nextTick, onBeforeUnmount, onMounted } from 'vue'
import { mounted, beforeDestroy, chart } from '@/utils/resize/resize.js'
import jsonp from 'jsonp'
import { debounce } from 'lodash-es'
const mapbox = ref()
// 初始化加载时候执行
function init() {
  let myChart = echarts.init(mapbox.value)

  const option = {
    title: {
      text: '项目数量分散图',
      link: '',
      // subtext: "shinuia",
      sublink: '',
    },
    series: [
      {
        name: '项目数量',
        type: 'map',
        map: 'china',
        label: {
          show: true,
          color: '#ffffff',
          fontSize: 8,
        },
        itemStyle: {
          areaColor: '#eee',
        },
        roam: true,
        zoom: 1.2,
        emphasis: {
          label: {
            color: '#fff',
            fontSize: 12,
          },
          itemStyle: {
            areaColor: '#83b5e7',
          },
        },
        data: [],
      },
    ],
    // {name: xxx, value: xxx}
    visualMap: [
      {
        type: 'piecewise',
        show: true,
        pieces: [
          { min: 10000 },
          { min: 1000, max: 9999 },
          { min: 100, max: 999 },
          { min: 10, max: 99 },
          { min: 1, max: 9 },
        ],
        // align: 'right'
        // showLabel: false
        inRange: {
          symbol: 'rect',
          color: ['#83b5e7', '#11035e'],
        },
        itemWidth: 20,
      },
    ],
    tooltip: {
      trigger: 'item',
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
  }

  jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427', {}, (err, data) => {
    if (!err) {
      // eslint-disable-next-line no-console
      console.log(data)
      let list = data.data.list.map((item) =>
        // eslint-disable-next-line no-console
        // console.log(item),
        ({
          name: item.name,
          value: item.value,
          susNum: item.susNum,
        })
      )
      option.series[0].data = list

      myChart.setOption(option)
      window.onresize = () => {
        myChart.resize()
      }
    }
  })
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})

onBeforeUnmount(() => {
  beforeDestroy()
})
</script>
<style lang="scss" scoped>
.content {
  width: 100%px;
  height: 500px;
  /*width: 100%;*/
  /*height: 100%;*/
  /* background-color: rgba(0, 0, 0, 0.3); */
  // color: #4a2fe4
}
</style>
