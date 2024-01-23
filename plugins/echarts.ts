import * as echarts from "echarts";

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp
  app.config.globalProperties.$echarts = echarts;
})
