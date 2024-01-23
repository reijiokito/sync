<script lang="ts" setup>
import { ensurePrefix } from '@antfu/utils'
const { item } = definePropsRefs<{
  item: any
}>()
const media = computed(() => ensurePrefix('/', item.value.media))

const appConfig = useAppConfig()
const tags = computed(() => {
  const _tags = appConfig.tags
  if (!item.value.tags) return []
  const itemTags = item.value.tags.split(',').map(item => item.trim())

  return itemTags.map(tag => {
    const tagItem = _tags.find(item => item.slug === tag)
    if (tagItem) {
      return tagItem
    }
    return undefined
  }).filter(Boolean)
})
</script>

<template>
  <div class="group flex flex-col gap-2 bg-gray-100/75 dark:bg-gray-900/75">
    <NuxtLink :to="media" target="_blank" class="relative aspect-16/9 of-hidden block rounded-md hover:scale-105 transition-all duration-300">
      <template v-if="item?.thumbnail">
        <img :src="item.thumbnail" class="absolute size-full inset-0 object-cover" />
      </template>
      <template v-else>
        <div class="flex-center size-full inset-0 absolute">
          <Icon :name="item.icon ?? 'i-ri:image-fill'" class="w-50% h-50% text-primary/75" />
        </div>
      </template>
    </NuxtLink>

    <div class="px-3 mt-2">
      <div v-if="tags?.length" class="mt-1 mb-1 flex flex-wrap gap-2">
        <TagItem v-for="(item, index) in tags" :color="item.color" :key="index">
          {{ item.name }}
        </TagItem>
      </div>
      <div class="flex justify-between">
        <NuxtLink :to="media" external target="_blank"
          class="flex-1 mt-2 dark:text-white text-lg font-semibold leading-snug tracking-tight">
          <span
            class="line-clamp-2 transition-[background_size] cursor-pointer bg-[length:0px_10px] from-primary-300 to-primary-200 bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_10px] hover:bg-[length:100%_3px] dark:from-primary-600 dark:to-primary-700">
            {{ item.title }}
          </span>
        </NuxtLink>
        <SButton class="flex-shrink-0" variant="outline" size="icon">
          <a class="i-ri:download-line text-14px" :download="media" :href="`${media}`" />
        </SButton>
      </div>
      <p v-if="item.description">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>
