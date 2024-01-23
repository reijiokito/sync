<script setup lang="ts">
import { NavigationMenuList, type NavigationMenuListProps } from 'radix-vue'

const props = defineProps<NavigationMenuListProps & { class?: string }>()
</script>

<template>
  <NavigationMenuList
    v-bind="props"
    :class="'group flex flex-1 list-none items-center justify-center space-x-1'"
  >
    <slot />
  </NavigationMenuList>
</template>
