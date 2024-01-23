<script setup lang="ts">
import type { QueryBuilderWhere } from '@nuxt/content/dist/runtime/types';

useHead({
  titleTemplate: '%s · Sigma Streaming',
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
const { params } = useRoute()

const slug = computed(() => params.slug.join('/'))

const { data: dataResourcesDir } = await useAsyncData('resources-list-dir', () => queryContent('resources').where({
  $or: [
    {
      _dir: {
        $eq: 'resources'
      }
    },
    {
      _dir: {
        $eq: ''
      }
    }
  ]
}).find())

const currentDir = computed(() => dataResourcesDir.value?.find(item => item._path === '/' + slug.value))

const tag = eagerComputed(() => useRoute().query.tag)

const query = computed<QueryBuilderWhere>(() => {
  if (params.slug.length === 1) {
    if (tag.value)
      return {
        tags: { '$contains': [tag.value] }
      }
    else
      return {
        $and: [
          { _dir: { $ne: 'resources' } },
          { _dir: { $ne: '' } },
        ]
      }
  }
  return {
    _dir: { $eq: params.slug[params.slug.length - 1] }
  }
})


const { data: dataResources } = await useAsyncData('resources-list-content', () => queryContent('resources')
  .where(query.value).find(),
  { watch: [tag] }
)

const appConfig = useAppConfig()
const tags = computed(() => appConfig.tags)
</script>

<template>
  <AppNavbar />
  <div class="flex container">
    <div class="mt-120px w-1/4 flex-shrink-0 py-5 pr-10 sticky top-[calc(var(--header-height))]">
      <h3 class="text-lg font-600">
        Categories
      </h3>
      <div class="grid mx--2 mt-4 gap-2">

        <NuxtLink v-for="item in dataResourcesDir" :key="item.to" exact-active-class="text-primary font-bold" :to="item._path"
          class="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2 hover:bg-primary/10 hover:text-primary">
          <div class="flex items-center gap-2">
            <Icon :name="item.icon" class="size-5" />
            <div>{{ item.title }}</div>
          </div>
          <div class="i-ri:arrow-right-line" />
        </NuxtLink>
      </div>

      <hr class="my-5 h-px border-0 bg-gray-200 dark:bg-gray-700">

      <template v-if="tags?.length">
        <h3 class="text-lg font-600">
          Tags
        </h3>

        <div v-if="tags?.length" class="mt-4 flex flex-wrap gap-2">
          <TagItem v-for="(item, index) in tags" :color="item.color" :key="index" :to="`/resources?tag=${item.slug}`">
            {{ item.name }}
          </TagItem>
        </div>
      </template>
    </div>
    <div class="flex-1">
      <h1 class="py-10 text-center text-4xl font-bold dark:text-white">
        {{ currentDir?.title }} <span v-if="tag">({{ tag }})</span>
      </h1>
      <div class="grid mt-5 gap-6 px-6 lg:grid-cols-2 lg:gap-4 xl:grid-cols-3 xl:gap-6 ">
        <template v-if="!dataResources?.length">
          <div class="col-span-3 flex-center flex-col py-10">
            <div class="i-ri:box-1-line text-30px" />
            <h2 class="mt-4 text-center text-2xl font-bold dark:text-white">
              No data
            </h2>
          </div>
        </template>
        <template v-else>
          <template v-for=" item in dataResources " :key="item._path">
            <ResourceItemImp v-if="item.type === 'resource'" :item="item" />
            <BlogItem v-else :item="item" />
          </template>
        </template>
      </div>
    </div>
  </div>
  <AppFooter />
</template>
