<script lang="ts" setup>
const props = withDefaults(defineProps<{
  href: any
  rounded?: boolean
  size?: string
  white?: boolean
  outline?: boolean
  link?: boolean
}>(), {
  size: 'lg',
  rounded: true
})

const NuxtLink = resolveComponent('NuxtLink')
const localPath = useLocalePath()

const external = computed(() => props.href.startsWith('http'))
</script>

<template>
  <SButton :external="external" class="underline-transparent hover:underline-current"
    :to="external ? href : localPath(href)" :as="NuxtLink" :size="size"
    :variant="link ? 'link' : outline ? 'outline' : white ? 'white' : 'gradient'"
    :class="[rounded ? 'rounded-full!' : '']">
    <slot />
  </SButton>
</template>
