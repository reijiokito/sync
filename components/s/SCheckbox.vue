<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'
import { Icon } from '@iconify/vue'

const checkboxOne = ref(false)

defineProps<{
  checked: boolean
}>()
const emit = defineEmits<{
  (e: 'update:checked', value: boolean): void,
}>()
</script>

<template>
  <div class="flex flex-col gap-2.5">
    <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100">
      <CheckboxRoot
        v-model:checked="checkboxOne"
        @update:checked="(val) => emit('update:checked', val)"
        class="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'"
      >
        <CheckboxIndicator class="bg-primary h-full w-full rounded flex items-center justify-center">
          <Icon icon="radix-icons:check" class="h-3.5 w-3.5 text-grass11" />
        </CheckboxIndicator>
      </CheckboxRoot>
    </label>
  </div>
</template>