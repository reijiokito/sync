<script setup lang="ts">
const { params } = useRoute()
const isResources = computed(() => params.slug.includes('resources'))
const isResourcesContent = computed(() => params.slug.length === 3)

const layout = computed(() => isResources.value ? isResourcesContent.value ? 'blog' : 'resources' : 'default')
</script>

<template>
  <NuxtLayout :name="layout">
    <ContentDoc />
  </NuxtLayout>
</template>
