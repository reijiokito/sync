<script setup lang="ts">
useHead({
  titleTemplate: '%s · Sigma Streaming',
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <AppNavbar />
  <slot />
  <AppFooter />
</template>
