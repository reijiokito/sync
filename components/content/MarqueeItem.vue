<script lang="ts" setup>
const { img } = definePropsRefs<{
  img: string
}>()
</script>

<template>
  <NuxtImg :src="img" class="object-scale-down max-h-64px mx-24px my-24px" />
</template>
