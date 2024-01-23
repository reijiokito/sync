<script lang="ts" setup>

const emit = defineEmits<{
  close: [],
}>()

const appConfig = useAppConfig()
function handleCloseBanner() {
  localStorage.setItem(appConfig.banner.key!, 'true')
  emit('close')
}
</script>

<template>
  <div class="flex items-center delay-200 h-40px bg-primary text-white">
    <p class="sm:top-1.5 w-full pl-4 sm:pl-0 sm:text-center text-sm font-medium">
      {{ appConfig.banner.text }} | <NuxtLink :to="appConfig.banner.link" target="_blank" class="font-bold underline">{{appConfig.banner.textLink}}</NuxtLink>
    </p>
    <div class="i-carbon:close text-18px cursor-pointer mr-4" @click="handleCloseBanner"/>
  </div>
</template>
