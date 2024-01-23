<script lang="ts" setup>
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const { formDescriptionId } = useFormField()
const { class: className, ...rest } = useAttrs()
</script>

<template>
  <p
    :id="formDescriptionId"
    :class="'text-sm text-muted-foreground'"
    v-bind="rest"
  >
    <slot />
  </p>
</template>