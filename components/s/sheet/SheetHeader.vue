<script setup lang="ts">
const props = defineProps<{ class?: string }>()
</script>

<template>
  <div :class="'flex flex-col space-y-2 text-center sm:text-left'">
    <slot />
  </div>
</template>
