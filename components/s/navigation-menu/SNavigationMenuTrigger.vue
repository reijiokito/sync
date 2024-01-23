<script setup lang="ts">
import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
} from 'radix-vue'

const props = defineProps<NavigationMenuTriggerProps>()
</script>

<template>
  <NavigationMenuTrigger class="group navigation-menu-trigger" v-bind="props">
    <slot />
    <div
      class="i-ri:arrow-down-s-line relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180 "
      aria-hidden="true" />
  </NavigationMenuTrigger>
</template>
