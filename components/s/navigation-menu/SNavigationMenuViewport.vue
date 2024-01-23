<script setup lang="ts">
import {
  NavigationMenuViewport,
  type NavigationMenuViewportProps,
} from 'radix-vue'

const props = defineProps<NavigationMenuViewportProps>()
</script>

<template>
  <div class="absolute left-0 top-full flex justify-center w-full">
    <NavigationMenuViewport
      v-bind="props"
      :class="
        'origin-top-center relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] border-gray-200 dark:border-trueGray-700'"
        md="w-[var(--radix-navigation-menu-viewport-width)]"
    />
  </div>
</template>
