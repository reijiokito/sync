<script lang="ts" setup>
const { col } = definePropsRefs<{
  col?: string
  padding?: string
  gap?: string
  bg?: boolean
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
    <div :style="{ '--col': col ?? 2, '--gap': gap ? gap + 'px' : '32px', '--padding': padding ? padding + 'px' : '0px' }"
      class="grid grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)]"
      :class="[bg ? 'bg-gray-100 dark:bg-trueGray-800 rounded-xl' : '']">

      <slot />
    </div>
  </section>
</template>
