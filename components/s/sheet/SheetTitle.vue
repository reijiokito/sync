<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'radix-vue'

const props = defineProps<DialogTitleProps & { class?: string }>()
</script>

<template>
  <DialogTitle
    :class="'text-lg font-semibold text-foreground'"
    v-bind="props"
  >
    <slot />
  </DialogTitle>
</template>
