<script lang="ts" setup>
const { path } = definePropsRefs<{ path: string }>()
const { data: item } = await useAsyncData(`section-resource-item:${path.value}`, () => queryContent('resources').where({
  _path: {
    $eq: path.value
  }
}).findOne())

</script>

<template>
  <swiper-slide v-if="item">
    <ResourceItemImp v-if="item.type === 'resource'" :item="item" />
    <BlogItem v-else :item="item" />
  </swiper-slide>
</template>
