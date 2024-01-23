<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'radix-vue'

const props = defineProps<DialogDescriptionProps & { class?: string }>()
</script>

<template>
  <DialogDescription
    :class="'text-sm text-muted-foreground'"
    v-bind="props"
  >
    <slot />
  </DialogDescription>
</template>
