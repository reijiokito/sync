<script setup lang="ts">
const props = defineProps<{
  title: string
  to: string
  icon: any
  description?: string
  new?: boolean
}>()

const localePath = useLocalePath()

</script>

<template>
  <button class="focus:outline-primary/10">
    <NuxtLink :to="localePath(to)" v-bind="$attrs"
      class="group block select-none rounded-[6px] p-6px text-gray-800 no-underline outline-none transition-colors hover:bg-primary/10 dark:text-trueGray-200 hover:text-primary">
      <div class="flex items-center gap-2">
        <div class="h-7 w-7 flex-center rounded-full bg-primary/20 text-primary">
          <div class="i-ri:article-line text-14px"  />
        </div>
        <div>
          <div class="flex items-center text-14px font-500">
            {{ title }}
            <span v-if="props.new" class="ml-1 rounded-lg bg-primary px-1 text-xs text-trueGray-100">
              New
            </span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </button>
</template>
