<script setup lang="ts">
import { AccordionItem, type AccordionItemProps } from 'radix-vue'

const props = defineProps<AccordionItemProps>()
</script>

<template>
  <AccordionItem v-bind="props" class="border-b border-b-gray-200 dark:border-b-trueGray-700">
    <slot />
  </AccordionItem>
</template>
