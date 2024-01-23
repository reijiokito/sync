<script lang="ts" setup>
useHead({
  titleTemplate: '%s · Sigma Streaming',
  meta: [
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
const { params } = useRoute()
const slug = computed(() => {
  const _slug = params.catalog + '/' + params.slug
  return 'resources/' + _slug
})
const { data: item } = await useAsyncData('resource-content-blog' + slug.value, () => queryContent('resources').where({
  _path: {
    $eq: '/' + slug.value
  }
}).findOne())

const appConfig = useAppConfig()
const date = computed(() => item.value.date ? useDateFormat(item.value.date, 'MMMM D, YYYY', { locales: 'en' }).value : '')
const author = computed(() => appConfig.authors.find(a => a.slug === item.value.author))

const links = computed(() => item.value?.body.toc.links)
</script>

<template>
  <AppNavbar />
  <div class="container mx-auto">
    <div class="max-w-screen-xl py-5 container lg:py-8">
      <div class="flex justify-center">
        <!-- TODO: tag -->
        <!-- <BlogsTagsLabel :categories="post?.tags" /> -->
      </div>

      <h1
        class="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight lg:text-4xl lg:leading-snug dark:text-white">
        {{ item?.title }}
      </h1>

      <div class="mt-3 flex justify-center text-gray-500 space-x-3">
        <div class="flex items-center gap-3">
          <div class="relative h-10 w-10 flex-shrink-0">
            <template v-if="author.avatar">
              <NuxtImg :src="author.avatar" :alt="author.name"
                class="absolute inset-0 h-full w-full rounded-full object-cover" />
            </template>
          </div>
          <div class="flex items-center text-sm gap-2">
            <div class="text-gray-800 dark:text-gray-400">
              by {{ author?.name }}
            </div>
            <!-- <div class="w-1px h-14px bg-border" /> -->
            <!-- <span class="text-sm">{{ item?.readingTime?.text }}</span> -->
            <template v-if="date">
              <div class="w-1px h-14px bg-border" />
              <div>
                Update on:
                <time class="text-gray-500 ml-1 dark:text-gray-400">
                  {{ date }}
                </time>
              </div>
            </template>


          </div>
        </div>
      </div>
    </div>

    <!-- <div class="relative z-0 mx-auto aspect-video max-w-screen-lg overflow-hidden lg:rounded-lg">
      <img v-if="item.thumbnail" :src="item?.thumbnail" :alt="item?.thumbnail || 'Thumbnail'"
        class="absolute inset-0 h-full w-full object-cover" />
    </div> -->

    <div class="mx-auto mt-14 flex max-w-screen-xl flex-col gap-5 px-5 md:flex-row">
      <article class="flex-1">
        <div class="mx-auto my-3 max-w-85ch prose prose-trueGray dark:prose-invert">
          <slot />
        </div>
        <!-- <BlogsAuthorCard v-if="item?.author" :author="item.author" /> -->
      </article>
      <div class="sticky top-[calc(var(--header-height))] w-full self-start md:w-256px">
        <div class="mt-5 font-sans">
          <Toc class="bg-background border-border text-sm p-4 rounded-xl">
            <template #title>
              <div class="mx-4 mb-4 text-lg font-semibold">
                Table of content
              </div>
            </template>

            <TocLinks v-slot="{ link }" class="ml-4" :links="links">
              <div class="block my-2 hover:underline">
                {{ link.text }}
              </div>
            </TocLinks>
          </Toc>
        </div>
      </div>
    </div>
  </div>
  <AppFooter />
</template>
