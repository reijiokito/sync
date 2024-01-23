<script lang="ts" setup>
const { span } = definePropsRefs<{
  span?: number
  noBg?: boolean
}>()
</script>

<template>
  <div :style="{ '--span': span ?? 1 }"
    class="custom-svg bg-transparent[&>em]:font-bold has-[em]:my-1 col-span-[var(--span)] py-1.5 px-2 text-base first:font-500 text-pretty text-center first:(justify-self-start pl-4) not-first:(flex-center)"
    :class="[noBg ? '': 'not-first:(bg-gray-100 dark:bg-trueGray-600)' ]"
    >
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>

<style>
.custom-svg svg {
  @apply h-5 w-5 text-gray-400 dark:text-gray-400 mx-2;
}

.custom-svg svg[check="true"] {
  @apply text-primary;
}
</style>
