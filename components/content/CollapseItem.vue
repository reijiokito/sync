<script lang="ts" setup>
import { randomStr } from '@antfu/utils'
const value = randomStr()
</script>

<template>
  <SAccordionItem :value="value">
    <SAccordionTrigger>
      <ContentSlot :use="$slots.title" unwrap="p" />
    </SAccordionTrigger>
    <SAccordionContent>
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </SAccordionContent>
  </SAccordionItem>
</template>
