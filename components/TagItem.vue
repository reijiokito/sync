<script lang="ts" setup>
import tinycolor from 'tinycolor2'

const { color } = definePropsRefs<{
  color: string
  to?: string
}>()

const hslColor = computed(() => tinycolor(color.value).toHsl())

const textColor = computed(() => {
  return invert(color.value, { black: '#000000', white: '#ffffff', threshold: 0.38 })
})

const NuxtLink = resolveComponent('NuxtLink')

</script>

<template>
  <Component :is="to ? NuxtLink: 'div'" :exact-active-class="'[--opacity:1]'" :to="to" :style="{
    '--color': `hsl(${hslColor.h} ${hslColor.s * 100}% ${hslColor.l * 100}% / var(--opacity, 1))`,
    '--textColor': textColor,
    '--opacity': 0.5,
  }"
    class="inline-block max-w-100px truncate bg-[var(--color)] rounded rounded-full font-medium tracking-wider uppercase text-12px px-2 py-1">
    <slot />
  </Component>
</template>
