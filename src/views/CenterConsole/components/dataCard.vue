<!--  -->
<template>
  <div>
    <div class="flex flex-wrap box">
      <n-card title="总项目数量"> {{ state.dataCounts.all_project_count }} </n-card>
      <n-card title="总销售额"> {{ state.dataCounts.all_project_fund_amount }} </n-card>
      <n-card title="支付笔数"> {{ state.dataCounts.all_project_fund_count }} </n-card>
      <n-card title="小程序访问量"> {{ state.dataCounts.total_login_times }} </n-card>
      <n-card title="今日新增服务商"> {{ state.dataCounts.today_new_user_count }} </n-card>
    </div>
    <div class="lineBox">
      <div class="lineCount">
        <span>小程序登录情况</span>
        <n-divider />
        <div ref="lineRef" class="wh-full"></div>
      </div>
      <div class="loginRank">
        <span>登录排名</span>
        <n-divider />
        <div>
          <n-grid x-gap="12" :cols="2">
            <n-gi>
              <div class="light-green">
                <div
                  v-for="(item, index) in state.timeRank1"
                  :key="item.user_id"
                  class="flex content-center justify-between list"
                >
                  <div class="circleNum">{{ index + 1 }}</div>
                  <n-avatar round size="small" :src="item.avatar_url" />
                  <span class="truncate nameList">{{ item.nick_name }}</span>
                  <span class="text-sm text-blue">{{ item.count }}次</span>
                </div>
              </div>
            </n-gi>
            <n-gi>
              <div class="green">
                <div
                  v-for="(item, index) in state.timeRank2"
                  :key="item.user_id"
                  class="flex content-center justify-between list"
                >
                  <div class="circleNum">{{ index + 11 }}</div>
                  <n-avatar round size="small" :src="item.avatar_url" />
                  <span class="truncate nameList">{{ item.nick_name }}</span>
                  <span class="text-sm text-red">{{ item.count }}次</span>
                </div>
              </div>
            </n-gi>
          </n-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getStatisticsData, getLoginTableData, getLoginTimeTopData } from '@/api/user'
import { Line } from '@antv/g2plot'
import { LessThan } from '@vicons/fa'
import { getCurrentInstance } from 'vue'
const lineRef = ref()
const line = ref()
function renderLineChart(data) {
  if (!lineRef.value) return
  line.value = new Line(lineRef.value, {
    data,
    autoFit: true,
    xField: 'date',
    yField: 'times',
    // seriesField: 'type',
    lineStyle: {
      lineWidth: 4,
      // stroke: 'black',
    },
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    // stepType: vhv,
    area: {
      style: {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
        lineDash: [4, 5],
      },
    },
    smooth: false,
    animation: {
      appear: {
        animation: 'wave-in',
        duration: 2000,
      },
    },
  })
  line.value.render()
}
const state = reactive({
  dataCounts: {},
  xcxLoginTable: [],
  timeRank1: [],
  timeRank2: [],
})
onMounted(async () => {
  const data = await getStatisticsData()

  let params = {
    end_time: $dayjs().unix(),
    start_time: $dayjs().subtract(7, 'day').unix(),
  }
  const data1 = await getLoginTableData(params)
  const data2 = await getLoginTimeTopData()
  console.log(data2)
  state.xcxLoginTable = data1.data
  state.dataCounts = data.data
  state.timeRank1 = data2.data.filter((item, index) => {
    return index < 10
  })

  state.timeRank2 = data2.data.filter((item, index) => {
    return index > 9
  })
  renderLineChart(state.xcxLoginTable)
})
</script>
<style lang="scss" scoped>
.box {
  // height: 100%;
  width: 100%;
  justify-content: space-between;
}

.lineBox {
  width: 100%;
  height: 300px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  // background-color: #ffffff;
  .lineCount {
    width: 70%;
    background-color: #ffffff;
    height: 540px;
    padding: 20px;
    font-size: 20px;
  }

  .loginRank {
    width: 28%;
    height: 540px;
    background-color: #ffffff;
    padding: 30px;
    font-size: 20px;
    .light-green {
      height: 420px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      padding-right: 20px;
    }
    .green {
      height: 420px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .list {
      align-items: center;
      .nameList {
        width: 80px;
        font-size: 10px;
      }
    }

    .circleNum {
      width: 16px;
      height: 16px;
      font-size: 4px;
      border-radius: 50%;
      background: #918d8d;
      display: flex;
      align-items: center;
      color: #ffffff;
      justify-content: center;
    }
  }
}
.n-card {
  min-width: 100px;
  max-width: 24%;
  margin: 20px 0px 0 0;

  row-gap: 16px;
}
</style>
