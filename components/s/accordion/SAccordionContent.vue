<script setup lang="ts">
import { AccordionContent, type AccordionContentProps } from 'radix-vue'

const props = defineProps<AccordionContentProps>()
</script>

<template>
  <AccordionContent v-bind="props"
    :class="'overflow-hidden text-sm transition-all data-[state=closed]:accordion-up data-[state=open]:accordion-down'">
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </AccordionContent>
</template>
