<script lang="ts" setup>
const { left } = definePropsRefs<{
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
    <SAccordion type="single" class="w-full" collapsible>
      <ContentSlot :use="$slots.default" unwrap="p" />
    </SAccordion>
  </section>
</template>
