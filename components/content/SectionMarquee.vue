<script lang="ts" setup>
const { } = definePropsRefs<{
  left?: boolean
}>()
</script>

<template>
  <section>
    <SectionTitle v-if="$slots.title || $slots.subtitle" :left="left">
      <template #title>
        <ContentSlot :use="$slots.title" unwrap="p" />
      </template>
      <template #subtitle>
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </template>
    </SectionTitle>

    <div>
      <Vue3Marquee :pauseOnHover="true">
        <ContentSlot :use="$slots.default" unwrap="p" />
      </Vue3Marquee>
    </div>
  </section>
</template>
