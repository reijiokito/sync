<script lang="ts" setup>
const appConfig = useAppConfig()
const showBanner = ref(false)
onMounted(() => {
  if (!appConfig.banner.enabled)
    showBanner.value = false
  else if (localStorage.getItem(appConfig.banner.key!))
    showBanner.value = false
  else
    showBanner.value = true
})

const _style = computed(() => `:root { --header-height: ${showBanner.value ? 40 + 64 : 64}px; }`)

useStyleTag(_style)
const hasFeature = computed(() => appConfig.productPinResource.enabled)

const { data: pinResource } = await useAsyncData(`production-pin-resource:${appConfig.productPinResource.path}`, () => queryContent('resources').where({
  _path: {
    $eq: appConfig.productPinResource.path
  }
}).findOne(), { immediate: appConfig.productPinResource.enabled })

const { data: products } = await useAsyncData('products', () => queryContent('products').find())
const { data: engines } = await useAsyncData('engines', () => queryContent('engines').find())
const { data: solutions } = await useAsyncData('solutions', () => queryContent('solutions').find())
const { data: resources } = await useAsyncData('resources', () => queryContent('resources').where({
  $or: [
    { _dir: { $eq: 'resources' } },
    { _dir: { $eq: '' } }
  ]
}).find())

const localePath = useLocalePath()

</script>

<template>
  <div class="sticky top-0 z-10 h-$header-height w-full bg-white shadow" dark="bg-trueGray-900">
    <AppBanner v-if="showBanner" @close="showBanner = false" />

    <div md="hidden" class=" py-12px flex-center">
      <AppHeaderDrawer />
    </div>

    <SNavigationMenu class="hidden w-full" md="grid w-full px-4 grid-cols-[1fr_auto_1fr] items-center h-64px xl:px-5 mx-auto">
      <div class="flex flex-wrap items-center justify-between lg:w-auto flex-shrink-0">
        <NuxtLink :to="localePath('/')" class="flex items-end gap-x-2 text-primary " dark="text-primary">
          <span>
            <img src="/logo_sigma.png" alt="LS" class="h-10 w-10">
          </span>
          <div class="hidden lg:block">
            <svg class="w-88px text-#484848 dark:text-white" width="88" height="19" viewBox="0 0 88 19" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M64.5247 0.948242C63.1337 0.948242 61.9113 1.45405 60.9419 2.33922C60.0146 1.4962 58.75 0.948242 57.359 0.948242C54.4085 0.948242 52.0059 3.35084 52.0059 6.30144V18.7359H55.5466V6.25924C55.5466 5.28974 56.3474 4.48894 57.3169 4.48894C58.2864 4.48894 59.0872 5.28974 59.0872 6.25924V15.7432C59.0872 15.9118 59.0872 16.0382 59.1294 16.1647V18.7359H62.6701V6.25924C62.6701 5.28974 63.4709 4.48894 64.4404 4.48894C65.4099 4.48894 66.2107 5.28974 66.2107 6.25924V18.6937H69.7514V6.25924C69.8779 3.30864 67.4753 0.948242 64.5247 0.948242Z"
                fill="currentColor" />
              <path
                d="M81.7644 0.948242H78.7296C75.779 0.948242 73.3764 3.35084 73.3764 6.30144V18.7359H76.9171V11.9917H83.5348V18.7359H87.0754V6.25924C87.1176 3.30864 84.715 0.948242 81.7644 0.948242ZM76.9592 8.24034V6.25924C76.9592 5.28974 77.7601 4.48894 78.7296 4.48894H81.7644C82.7339 4.48894 83.5348 5.28974 83.5348 6.25924V8.24034H76.9592Z"
                fill="currentColor" />
              <path
                d="M24.0601 0.948242C23.0063 0.948242 22.2054 1.79126 22.2054 2.84503V18.778H25.9569V2.80288C25.9147 1.79126 25.0717 0.948242 24.0601 0.948242Z"
                fill="currentColor" />
              <path
                d="M5.38718 4.57334H14.8712C16.8523 4.57334 18.4118 2.97154 18.4118 1.03262H5.38718C2.43662 1.03262 0.0761719 3.43524 0.0761719 6.38574C0.0761719 8.45114 1.25639 10.2215 2.94243 11.1066C3.40609 11.4017 3.95405 11.5703 4.50201 11.6125C4.79707 11.6546 5.09213 11.6968 5.38718 11.6968H13.5223C14.2811 11.9075 14.8712 12.5819 14.8712 13.4249C14.8712 14.3944 14.0703 15.1953 13.1008 15.1953H3.659C1.6779 15.1953 0.118322 16.797 0.118322 18.736H13.1008C16.0514 18.736 18.454 16.3334 18.454 13.3828C18.454 11.3174 17.2738 9.54714 15.5877 8.66194C15.1241 8.36684 14.5761 8.19824 14.0281 8.15614C13.7331 8.11394 13.438 8.07184 13.143 8.07184H4.96567C4.20696 7.86104 3.61685 7.18664 3.61685 6.34364C3.61685 5.37414 4.41771 4.57334 5.38718 4.57334Z"
                fill="currentColor" />
              <path
                d="M42.7329 8.11384H35.6516V11.6544H42.6908C43.6602 11.6544 44.4611 12.4553 44.4611 13.4248C44.4611 14.3943 43.6602 15.1951 42.6908 15.1951H34.7242C33.7548 15.1951 32.9117 14.3943 32.9117 13.4248V6.38564C32.9117 5.41614 33.7548 4.61524 34.7242 4.61524H44.2082C46.1893 4.61524 47.7489 3.01354 47.7489 1.07461H34.7242C31.7737 1.07461 29.3711 3.47724 29.3711 6.42774V13.5091C29.3711 16.291 31.5208 18.6093 34.2606 18.8201C34.2606 18.8201 34.2606 18.8201 34.2606 18.8622H42.6065C45.557 18.8622 47.9596 16.4596 47.9596 13.5091C47.9596 10.5585 45.6835 8.11384 42.7329 8.11384Z"
                fill="currentColor" />
            </svg>

            <div class="flex items-center gap-0.75">
              <span class="h-1.5 w-1.5 animate-ping rounded-full bg-primary" />
              <span class="text-14px/19px font-600 tracking-widest" lg="inline-block">Streaming</span>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="flex justify-center">
        <SNavigationMenuList>
          <SNavigationMenuItem>
            <SNavigationMenuTrigger>Products</SNavigationMenuTrigger>
            <SNavigationMenuContent>
              <div class="flex" md="w-screen-md" lg="w-screen-lg" xl="w-screen-xl">
                <div class="grid grid-cols-2 xl:grid-cols-3 gap-6 px-5" :class="[hasFeature ? 'w-3/4' : 'w-full']">
                  <div class="xl:col-span-2 py-5">
                    <h1 class="text-lg font-600">
                      Our products
                    </h1>
                    <div class="my-2 h-1px bg-gray-200 dark:bg-trueGray-700" />
                    <ul class="grid m-0 list-none gap-10px" xl="grid-cols-2">
                      <AppNavMenuItem v-for="item in products" :key="item.key" :to="localePath(item._path)"
                        v-bind="item" />
                    </ul>
                  </div>

                  <div class="col-span-1 py-5">
                    <h1 class="text-lg font-600">
                      Our engines
                    </h1>
                    <div class="my-2 h-1px bg-gray-200 dark:bg-trueGray-700" />
                    <ul class="grid m-0 list-none gap-10px" md="grid-cols-1">
                      <AppNavMenuItem v-for="item in engines" :key="item.key" :to="localePath(item._path)"
                        v-bind="item" />
                    </ul>
                  </div>
                </div>
                <div v-if="hasFeature && pinResource"
                  class="w-1/4 p-1 flex-center border-l-1px min-w-0 border-gray-200 dark:border-trueGray-700">
                  <ResourceItemImp class="h-full" v-if="pinResource.type === 'resource'" :item="pinResource" />
                  <BlogItem class="h-full" v-else :item="pinResource" />
                </div>
              </div>
            </SNavigationMenuContent>
          </SNavigationMenuItem>
          <SNavigationMenuItem>
            <SNavigationMenuTrigger>Solutions</SNavigationMenuTrigger>
            <SNavigationMenuContent>
              <div class="flex" md="w-screen-md">
                <div class="grid grid-cols-2 gap-6 px-5 w-full">
                  <div class="col-span-2 py-5">
                    <h1 class="text-lg font-600">
                      Our solutions
                    </h1>
                    <div class="my-2 h-1px bg-gray-200 dark:bg-trueGray-700" />
                    <ul class="grid m-0 list-none gap-10px" md="grid-cols-2">
                      <AppNavMenuItem v-for="item in solutions" :key="item.key" :to="localePath(item._path)"
                        v-bind="item" />
                    </ul>
                  </div>
                </div>
              </div>
            </SNavigationMenuContent>
          </SNavigationMenuItem>
          <SNavigationMenuItem>
            <SNavigationMenuTrigger>Resources</SNavigationMenuTrigger>
            <SNavigationMenuContent>
              <ul class="grid grid-flow-row grid-cols-2 m-0 list-none gap-x-12px p-12px" md="w-500px">
                <AppNavMenuItem v-for="item in resources" :key="item._id" :to="localePath(item._path)" v-bind="item"
                  :icon="item.icon" />
              </ul>
            </SNavigationMenuContent>
          </SNavigationMenuItem>

          <SNavigationMenuItem>
            <NuxtLink to="https://thudomultimedia.com/" external target="_blank">
              <SNavigationMenuLink class="navigation-menu-trigger">
                About Us
              </SNavigationMenuLink>
            </NuxtLink>

          </SNavigationMenuItem>

          <SNavigationMenuItem>
            <NuxtLink exact-active-class="text-primary" :to="localePath('/pricing')">
              <SNavigationMenuLink class="navigation-menu-trigger">
                Pricing
              </SNavigationMenuLink>
            </NuxtLink>
          </SNavigationMenuItem>
          <SNavigationMenuItem>
            <NuxtLink :to="localePath('/cart')">
              <SNavigationMenuLink class="navigation-menu-trigger">
                Shopping cart
              </SNavigationMenuLink>
            </NuxtLink>
          </SNavigationMenuItem>
        </SNavigationMenuList>
      </div>
      <div class="hidden justify-self-end gap-3 xl:flex">
        <div class="2xl:flex hidden items-center">
          <SNavigationMenuItem>
            <NuxtLink to="https://portal.sigmaott.com/" external>
              <SNavigationMenuLink class="navigation-menu-trigger">
                Login
              </SNavigationMenuLink>
            </NuxtLink>
          </SNavigationMenuItem>
          <div class="h-30px border-l-1" />
          <SNavigationMenuItem>
            <NuxtLink to="https://appt.link/meet-with-sigma-team" data-appointlet-modal>
              <SNavigationMenuLink class="navigation-menu-trigger text-primary">
                View demo
              </SNavigationMenuLink>
            </NuxtLink>
          </SNavigationMenuItem>
        </div>
        <SNavigationMenuItem class="hidden xl:block">
          <NuxtLink to="https://portal.sigmaott.com/auth/login?redirect=/apps" external target="_blank">
            <SButton :variant="'gradient'" class="text-sm w-125px">
              Start free trial
            </SButton>
          </NuxtLink>
        </SNavigationMenuItem>
      </div>
    </SNavigationMenu>
</div></template>
