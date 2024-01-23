<script lang="ts" setup>
const { data: products } = await useAsyncData('products', () => queryContent('products').find())
const { data: engines } = await useAsyncData('engines', () => queryContent('engines').find())
const { data: solutions } = await useAsyncData('solutions', () => queryContent('solutions').find())
const { data: resources } = await useAsyncData('resources', () => queryContent('resources').where({
  $or: [
    { _dir: { $eq: 'resources' } },
    { _dir: { $eq: '' } }
  ]
}).find())

const options = [{ value: 'en', label: 'English' }, { value: 'vi', label: 'Tiếng Việt' }]
const { locale } = useI18n()

</script>

<template>
  <div class="mt-20 border-b border-t border-gray-200 dark:border-trueGray-700">
    <footer class="grid grid-cols-3 lg:grid-cols-5 gap-10 px-10 py-10 text-15px container">

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default font-500 text-primary">
          Products
        </div>

        <NuxtLink v-for="item in products" :key="item._path" hover="underline underline-primary text-primary"
          :to="item._path">
          {{ item.title }}
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default font-500 text-primary">
          Engines
        </div>

        <NuxtLink v-for="item in engines" :key="item._path" hover="underline underline-primary text-primary"
          :to="item._path">
          {{ item.title }}
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default font-500 text-primary">
          Solutions
        </div>

        <NuxtLink v-for="item in solutions" :key="item._path" hover="underline underline-primary text-primary"
          :to="item._path">
          {{ item.title }}
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default font-500 text-primary">
          Resources
        </div>
        <NuxtLink v-for="item in resources" :key="item._path" hover="underline underline-primary text-primary"
          :to="item._path">
          {{ item.title }}
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-8px">
        <div class="mb-8px cursor-default font-500 text-primary">
          Company
        </div>
        <NuxtLink hover="underline underline-primary text-primary" to="https://thudomultimedia.com/" target="_blank">
          About Us
        </NuxtLink>
        <NuxtLink hover="underline underline-primary text-primary" to="/contact">
          Contact Us
        </NuxtLink>
      </div>


    </footer>
  </div>
  <div class="py-10">
    <footer class="grid grid-cols-2 items-end gap-10 container">
      <div class="left">
        <div>
          <a rel="noopener" target="_blank" class="max-w-250px flex">
            <img src="/thudo_logo.png" alt="logo" class="mr-8px h-50px w-100px">
            <div class="select-none text-13px font-600 text-gray-400 hover:text-primary">
              Thu Do Multimedia Communications Joint Stock Company
            </div>
          </a>

          <div class="mt-8px text-13px text-gray-500">
            <div>
              10th floor, No 48 Le Van Luong
            </div>
            <div>
              N1 New Urban, Nhan Chinh Ward, Thanh Xuan District, Hanoi, Vietnam
            </div>
          </div>
        </div>
      </div>

      <div class="justify-self-end">
        <div class="flex justify-between items-center py-3">
          <div class="flex gap-3">
            <AppSocialIcons />
          </div>
          <LangSelect v-model="locale" :options="options" class="w-140px! h-36px" />
          <!-- <AppDarkSwitch class="hidden!" /> -->
        </div>

        <div class="mt-8px text-13px text-gray-500">
          <div>
            Tel: (+84) 4 3668 7038
          </div>
          <div>
            Email: thudojsc@gviet.vn
          </div>
          <div>
            2023 by Thu Do Multimedia. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
