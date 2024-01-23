<script lang="ts" setup>
const { item } = definePropsRefs<{
  item: any
}>()

const appConfig = useAppConfig()

const author = computed(() => appConfig.authors.find(a => a.slug === item.value.author))
const localePath = useLocalePath()

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
  <div class="group bg-gray-100/75 dark:bg-gray-900/75">
    <NuxtLink :to="localePath(item._path)"
      class="overflow-hidden relative aspect-16/9 block rounded-md transition-all duration-300 hover:scale-105 dark:bg-gray-800">
      <template v-if="item?.thumbnail">
        <img :src="item.thumbnail" class="absolute size-full inset-0 object-cover" />
      </template>
      <template v-else>
        <div class="flex-center size-full inset-0 absolute">
          <Icon :name="item.icon ?? 'i-ri:image-fill'" class="w-50% h-50% text-primary/75" />
        </div>
      </template>
    </NuxtLink>

    <div>
      <div class="p-2">
        <div v-if="tags?.length" class="mt-1 mb-1 flex flex-wrap gap-2">
          <TagItem v-for="(item, index) in tags" :color="item.color" :key="index">
            {{ item.name }}
          </TagItem>
        </div>
        <NuxtLink class="text-lg font-semibold leading-snug tracking-tight dark:text-white" :class="{
        }" :to="item._path">
          <span
            class="transition-[background-size] cursor-pointer bg-[length:0px_10px] from-primary-300 to-primary-200 bg-gradient-to-r bg-left-bottom bg-no-repeat duration-500 hover:bg-[length:100%_10px] hover:bg-[length:100%_3px] dark:from-primary-600 dark:to-primary-700">
            {{ item.title }}
          </span>
        </NuxtLink>

        <div class="mb-2 mt-3 flex items-center text-gray-500 space-x-3 dark:text-gray-400">
          <div v-if="author" class="flex items-center gap-3">
            <div class="relative h-32px w-32px flex-shrink-0">
              <NuxtImg class="absolute inset-0 h-full w-full rounded-full object-cover" :src="author.avatar"
                :alt="author.slug" />
            </div>
            <div>
              <span class="truncate text-sm">
                {{ author.name }}

              </span>
              <template v-if="author.title">
                <p class="text-xs my-0">
                  {{ author.title }}
                </p>
              </template>
            </div>
          </div>
          <!-- <span class="text-xs text-gray-300 dark:text-gray-600">
            &bull;
          </span>
          <time class="truncate text-sm" :datetime="item?.publishedAt || item._createdAt">
            {{ useDateFormat(item?.publishedAt || item._createdAt, 'MMMM D, YYYY').value }}
          </time> -->
        </div>
      </div>
    </div>
  </div>
</template>
