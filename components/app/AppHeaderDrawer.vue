<script setup lang="ts">
const showDrawer = useShowDrawer()

const { data: products } = await useAsyncData('products', () => queryContent('products').find())
const { data: engines } = await useAsyncData('engines', () => queryContent('engines').find())
const { data: solutions } = await useAsyncData('solutions', () => queryContent('solutions').find())
const { data: resources } = await useAsyncData('resources', () => queryContent('resources').where({
  $or: [
    { _dir: { $eq: 'resources' } },
    { _dir: { $eq: '' } }
  ]
}).find())
</script>

<template>
  <SSheet v-model:open="showDrawer">
    <SSheetTrigger as-child>
      <NuxtImg src="/logo_sigma.png" alt="LS" class="h-10 w-10 cursor-pointer"/>
    </SSheetTrigger>
    <SSheetContent>
      <!-- <SSheetHeader>
        <SSheetTitle>Edit profile</SSheetTitle>
        <SSheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SSheetDescription>
      </SSheetHeader> -->
      <div class="grid gap-4">
        <h1 class="text-base font-600">
          Our products
        </h1>
        <ul class="grid m-0 list-none gap-6px" md="grid-cols-2">
          <AppLinkDrawer
            v-for="item in products" :key="item._id" :title="item.title"
            :to="item._path" :icon="item.icon"
          />
        </ul>
        <div class="my-1 h-1px bg-gray-200 dark:bg-trueGray-700" />
        <h1 class="text-base font-600">
          Our engines
        </h1>
        <ul class="grid m-0 list-none gap-6px" md="grid-cols-2">
          <AppLinkDrawer
            v-for="item in engines" :key="item._id" :title="item.title"
            :to="item._path" :icon="item.icon"
          />
        </ul>
        <div class="my-1 h-1px bg-gray-200 dark:bg-trueGray-700" />
        <h1 class="text-base font-600">
          Our solutions
        </h1>
        <ul class="grid m-0 list-none gap-6px" md="grid-cols-2">
          <AppLinkDrawer
            v-for="item in solutions" :key="item._id" :title="item.title"
            :to="item._path" :icon="item.icon"
          />
        </ul>

        <div class="my-1 h-1px bg-gray-200 dark:bg-trueGray-700" />

        <h1 class="text-base font-600">
          Resources
        </h1>

        <ul class="grid grid-flow-row grid-cols-2 m-0 list-none gap-x-12px" md="w-500px">
          <AppLinkDrawer
            v-for="item in resources" :key="item._id" :title="item.title"
            :to="item._path" :icon="item.icon"
          />
        </ul>
      </div>
      <!-- <SSheetFooter>
        <SSheetClose as-child>
          <button type="submit">
            Save changes
          </button>
        </SSheetClose>
      </SSheetFooter> -->
    </SSheetContent>
  </SSheet>
</template>
