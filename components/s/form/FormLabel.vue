<script lang="ts" setup>
import { useAttrs } from 'vue'
import { Label, type LabelProps } from 'radix-vue'

defineOptions({
  inheritAttrs: false,
})
const props = defineProps<LabelProps>()

const { error, formItemId } = useFormField()
const { class: className, ...rest } = useAttrs()
</script>

<template>
  <Label
    class="block text-base tracking-tight font-medium text-foreground text-left w-250px"
    :class="[className,{'text-destructive!': !!error}]"
    :for="formItemId"
    v-bind="rest"
  >
    <slot />
  </Label>
</template>
