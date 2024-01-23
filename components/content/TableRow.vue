<script lang="ts" setup>
const { col } = definePropsRefs<{
  left?: boolean
  col?: number
  gap?: number
  padding?: number
  noBorder?: boolean
}>()
</script>

<template>
  <div :style="{ '--col': col ?? 4, '--gap': gap ? gap + 'px' : '24px', '--padding': padding ? padding + 'px' : '0px' }"
    class="grid xl:grid-cols-[repeat(var(--col),minmax(0,1fr))] gap-[var(--gap)] p-[var(--padding)] border-l-2px not-first:border-l-primary first:border-l-transparent "
    :class="[
      noBorder ? '': 'border-b-1px border-b-gray-200 dark:border-b-trueGray-700'
    ]"
    >

    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>
