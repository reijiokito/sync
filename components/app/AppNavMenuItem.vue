<script setup lang="ts">
const props = defineProps<{
  title?: string
  _path?: string
  icon?: string
  description?: string
  new?: boolean
  comingsoon?: boolean
}>()
</script>

<template>
  <NavigationMenuLink as-child>
    <NuxtLink :to="_path" v-bind="$attrs"
      class="group block select-none rounded-[6px] p-8px text-gray-800 no-underline outline-none transition-colors hover:bg-primary/10 dark:text-trueGray-200 hover:text-primary">
      <div class="flex items-center gap-3">
        <Icon :name="icon ?? 'i-ri:article-line'"
          class="h-10 w-10 p-2 flex-center rounded-full flex-shrink-0 bg-primary/20 text-primary">
        </Icon>
        <div>
          <div class="flex items-center text-base font-500">
            {{ title }}
            <span v-if="props.new" class="ml-1 rounded-lg bg-primary px-2 text-xs text-trueGray-100">
              New
            </span>
            <span v-if="props.comingsoon" class="ml-1 rounded-lg bg-trueGray-200 px-2 text-xs">
              Coming soon
            </span>
          </div>
          <div v-if="description" class="text-sm font-400">
            {{ description }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </NavigationMenuLink>
</template>
