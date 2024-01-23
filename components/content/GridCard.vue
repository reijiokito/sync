<script lang="ts" setup>
defineProps<{
  span?: number
  icon: string
  left?: boolean
  padding?: number
}>()

const slot = useSlots()
const rowSpan = computed(() => {
  let rowSpan = 1
  if (slot.title)
    rowSpan++
  if (slot.subtitle)
    rowSpan++
  if (slot.default)
    rowSpan++
  return rowSpan
})
</script>

<template>
  <div
    class="col-span-[var(--span)] p-[var(--padding)] grid grid-row-[span_4] gap-3 grid-rows-subgrid rounded-2xl bg-gray-100 dark:bg-trueGray-800"
    :style="{
      '--span': span ?? 1, '--padding': padding ? padding + 'px' : '24px', 'grid-row': `span ${rowSpan}`
    }">
    <div :class="[left ? '' : 'flex-center']">
      <div v-if="$slots.image" class="size-70px relative flex flex-shrink-0">
        <Slot class="absolute inset-0 h-full w-full object-scale-down">
          <ContentSlot :use="$slots.image" unwrap="p" />
        </Slot>
      </div>
      <div v-else-if="icon" class="size-70px flex flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
        <Icon :name="icon ?? 'i-ri:article-line'" class="h-48px w-48px text-primary" />
      </div>
    </div>
    <div v-if="$slots.title" class="font-medium text-gray-800 dark:text-gray-200"
      :class="[left ? '' : 'text-center text-balance']">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </div>
    <div v-if="$slots.subtitle" :class="[left ? '' : 'text-balance text-center']">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </div>
    <div v-if="$slots.default">
      <ContentSlot :use="$slots.default" unwrap="p" />
    </div>
  </div>
</template>
