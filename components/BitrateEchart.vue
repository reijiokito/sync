<script setup lang="ts">
import { useDark, useECharts, type EchartOptions } from "@pureadmin/utils"

const { isDark } = useDark()

const { defaultData, pteData, currentIndex } = definePropsRefs<{
  defaultData: number[]
  pteData: number[]
  currentIndex: number
}>()

let theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "default"
})

const chartRef = ref<HTMLDivElement | null>(null)
const { setOptions, getInstance } = useECharts(
  chartRef as Ref<HTMLDivElement>,
  { theme }
)

let xData = (() => {
  let data: any[] = []
  for (let i = 1; i < defaultData.value.length; i++) {
    const value = i * 2
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    data.push(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
  }
  return data
})()

setOptions(
  {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      borderWidth: 0,
      top: 48,
      bottom: 48,
      left: 72,
    },
    legend: {
      textStyle: {
        color: "#90979c",
      },
      data: ["Default", "Per Title"],
    },
    calculable: true,
    xAxis: [
      {
        triggerEvent: true,
        type: "category",
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        data: xData,
      },
    ],
    yAxis: [
      {
        triggerEvent: true,
        type: "value",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: true,
        },
        axisLabel: {
          formatter(value, index) {
            return value + ' Mbps'
          },
        }
      },
    ],
    dataZoom: [
      {
        type: "slider",
        show: false,
        realtime: true,
        startValue: 0,
        endValue: 0,
      },
    ],
    series: [
      {
        name: "Default",
        type: "line",
        // symbolSize: 10,
        // symbol: "circle",
        data: defaultData.value
      },
      {
        name: "Per Title",
        type: "line",
        // symbolSize: 10,
        // symbol: "circle",
        data: pteData.value,
      },
    ],
    addTooltip: true,
  },
)

watch(currentIndex, () => {
  getInstance()!.dispatchAction({
    type: "dataZoom",
    startValue: Math.max(currentIndex.value - 1 - 10, 0),
    endValue: currentIndex.value - 1,
  })
})
</script>

<template>
  <div class="w-full bg-white rounded shadow dark:bg-gray-800">
    <div ref="chartRef" style="width: 100%; height: 350px" />
  </div>
</template>
