<script lang="ts" setup>
const { col } = definePropsRefs<{
  col?: number
  gap?: number
  padding?: number
}>()
const targetRef = ref(null)
const full = ref(true)
const appConfig = useAppConfig()

useIntersectionObserver(targetRef, ([{ isIntersecting }]) => {
  full.value = isIntersecting
}, { threshold: 1, rootMargin: appConfig.banner.enabled ? '-104px 0px 0px 0px' : '-64px 0px 0px 0px' })

provide('full', full)

const stop = usePricingStop()
const hPricing = useHeightPricing()
const targetRef2 = ref()
const { height } = useElementBounding(targetRef2)

watchOnce(height, () => {
  if (height.value === 0) {
    hPricing.value = 0
  } else {
    hPricing.value = height.value
  }
})


</script>

<template>
  <div class="" :class="[full ? '' : '']">
    <section :class="[full ? '' : 'opacity-0']">
      <div ref="targetRef"
        :style="{ '--col': col ?? 4, '--gap': gap ? gap + 'px' : '24px', '--padding': padding ? padding + 'px' : '0px' }"
        class="grid xl:grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)]">

        <div class="" :class="`container flex w-full flex-col mt-10`">

          <h2
            class="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white">
            <ContentSlot :use="$slots.title" unwrap="p" />
          </h2>
          <div v-if="full"
            class="py-2 text-start text-base prose prose-trueGray dark:prose-invert lg:text-base xl:text-base">
            <ContentSlot :use="$slots.subtitle" unwrap="p" />
          </div>
        </div>
        <div :style="{
          '--col': (col ?? 4) - 1,
          '--gap': gap ? gap + 'px' : '32px',
          '--padding': padding ? padding + 'px' : '0px',
          '--span': (col ?? 4) - 1
        }"
          class="grid col-span-[var(--span)] grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)]">
          <ContentSlot :use="$slots.default" unwrap="p" />
        </div>
      </div>
    </section>
    <div ref="targetRef2" :class="[full || stop ? 'hidden' : 'block z-100 fixed pt-5 pb-5 w-screen top-0 bg-background']">
      <div class="container mx-auto">
        <div
          :style="{ '--col': col ?? 4, '--gap': gap ? gap + 'px' : '24px', '--padding': padding ? padding + 'px' : '0px' }"
          class="grid xl:grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)]">

          <div class="" :class="`container flex w-full flex-col mt-10`">

            <h2
              class="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white">
              <ContentSlot :use="$slots.title" unwrap="p" />
            </h2>
          </div>
          <div :style="{
            '--col': (col ?? 4) - 1,
            '--gap': gap ? gap + 'px' : '32px',
            '--padding': padding ? padding + 'px' : '0px',
            '--span': (col ?? 4) - 1
          }"
            class="grid col-span-[var(--span)] grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)]">
            <ContentSlot :use="$slots.default" unwrap="p" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
