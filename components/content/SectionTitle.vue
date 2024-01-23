<script lang="ts" setup>
defineProps<{
  left?: boolean
}>()

defineSlots<{
  default?: () => any
  subtitle?: () => any
  title?: () => any
}>()
</script>

<template>
  <div class="" :class="`container flex w-full flex-col my-10 ${left ? '' : 'items-center justify-center text-center'}`">
    <div v-if="$slots.subtitle" class="text-lg font-bold tracking-wider uppercase text-primary">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </div>

    <h2 v-if="$slots.title"
      class="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h2>
    <div v-if="$slots.default" class="max-w-2xl py-2 text-start text-lg prose prose-trueGray dark:prose-invert lg:text-xl xl:text-xl">
      <slot />
    </div>
  </div>
</template>
