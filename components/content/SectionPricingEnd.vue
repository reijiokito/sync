<script lang="ts" setup>

const targetRef = ref(null)
const { top } = useElementBounding(targetRef)
const stop = usePricingStop()
const hPricing = useHeightPricing()

watchImmediate(top, () => {
  if (!hPricing.value) {
    stop.value = false
    return
  }
  const newStop = top.value <= hPricing.value
  if (newStop != stop.value)
    stop.value = newStop
})


</script>

<template>
  <div ref="targetRef" class="w-full"></div>
</template>
