<script lang="ts" setup>
const { recommended } = definePropsRefs<{
  recommended?: boolean
}>()

const full = inject('full')

</script>

<template>
  <div class="border-2px grid grid-rows-subgrid gap-4 rounded-12px p-24px" :class="[
    recommended ? 'border-primary' : 'border-transparent',
    full ? 'grid-row-[span_4]' : 'grid-row-[span_2]'
  ]">
    <div class="flex gap-3 items-center">
      <div class="text-base font-bold">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </div>
      <div v-if="recommended && full"
        class="px-2 py-1 rounded-full text-sm font-500 border-primary border-1px text-primary">
        Recommended
      </div>
      <div v-if="!full" class="flex gap-1 items-end">
        <div class="font-bold text-base">
          <ContentSlot :use="$slots.price" unwrap="p" />
        </div>
        <div class="text-base font-500 text-secondary">
          <ContentSlot :use="$slots.subprice" unwrap="p" />
        </div>
      </div>
    </div>
    <div v-if="full" class="flex gap-3 items-end">
      <div class="font-bold text-5xl">
        <ContentSlot :use="$slots.price" unwrap="p" />
      </div>
      <div class="text-base font-bold text-secondary">
        <ContentSlot :use="$slots.subprice" unwrap="p" />
      </div>
    </div>
    <div v-if="full" class="text-pretty leading-snug text-sm">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </div>
    <div class="flex flex-col gap-2" :class="[full ? '' : 'max-h-44px of-hidden']">
      <ContentSlot :use="$slots.cta" unwrap="p" />
    </div>
  </div>
</template>
