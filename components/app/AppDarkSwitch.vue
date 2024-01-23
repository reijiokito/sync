<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="flex items-center">
    <button class="rounded-full text-gray-500 outline-none dark:text-gray-300 hover:text-primary focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20" @click="toggleDark">
      <span class="sr-only">Dark Mode</span>
      <div class="i-carbon:sun dark:i-carbon:moon text-18px" />
    </button>
  </div>
</template>
