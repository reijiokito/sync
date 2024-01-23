<script lang="ts" setup>
const { icon, size } = definePropsRefs<{
  icon?: string
  size?: 'default' | 'small'
}>()

const small = computed(() => size.value === 'small')
</script>

<template>
  <div class="mt-12 flex items-center space-x-4 first:mt-0" :class="small && 'mt-10px! gap-2!'">
    <div v-if="$slots.image" class="mt-1 relative size-70px flex-center flex-shrink-0">
      <Slot class="absolute inset-0 h-full w-full object-scale-down">
        <ContentSlot :use="$slots.image" unwrap="p" />
      </Slot>
    </div>
    <div v-else-if="icon"
      class="mt-1 size-70px flex flex-shrink-0 items-center justify-center rounded-full bg-primary/20" :class="small && 'size-45px!'">
      <Icon :name="icon ?? 'i-ri:article-line'" class="h-48px w-48px text-primary" :class="small && 'h-10! w-10! p-1.5!'" />
    </div>

    <div>
      <h4 class="text-xl font-medium text-gray-800 dark:text-gray-200" :class="small && 'text-base!'">
        <ContentSlot :use="$slots.title" unwrap="p" />
      </h4>
      <div class="mt-1 text-gray-500 dark:text-gray-400" :class="small && 'text-sm!'">
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </div>
    </div>
  </div>
</template>
