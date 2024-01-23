<script setup lang="ts">
const icons = computed<any>(() => [
  {
    name: 'facebook',
    href: 'https://www.facebook.com/sigma-streaming',
    rel: 'noopener noreferrer',
    label: 'Facebook',
    icon: 'i-fa-brands:facebook',
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/sigma-streaming',
    rel: 'noopener noreferrer',
    label: 'LinkedIn',
    icon: 'i-fa-brands:linkedin',
  },
  {
    name: 'github',
    href: 'https://www.github.com/sigma-streaming',
    rel: 'noopener noreferrer',
    label: 'GitHub',
    icon: 'i-fa-brands:github',
  },
])
</script>

<template>
  <NuxtLink
    v-for="icon in icons" :key="icon.label" :rel="icon.rel" :title="icon.label" :aria-label="icon.label"
    :href="icon.href" target="_blank"
    class="flex text-gray-500 hover:text-primary"
  >
    <div v-if="icon.icon" :class="icon.icon" class="text-20px" />
  </NuxtLink>
</template>
