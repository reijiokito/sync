<script lang="ts" setup>
</script>

<template>
  <div class="grid justify-items-center bg-[linear-gradient(180deg,#FCF7EC_0%,#FCF2EC_100%)] py-10 container"
    lg="flex flex-wrap">
    <div class="w-full flex items-center" lg="w-3/5" xl="w-1/2">
      <div class="grid mx-auto mb-8 justify-items-center" lg="max-w-2xl justify-items-start">
        <h1 v-if="$slots.title" class="text-3xl pt-5 font-bold leading-snug tracking-tight text-gray-800" lg="text-50px leading-tight"
          xl="text-50px leading-tight" dark="text-white">
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h1>
        <div v-if="$slots.subtitle" class="pt-5 text-20px text-pretty leading-normal text-gray-500 lg:text-20px xl:text-20px dark:text-gray-300">
          <ContentSlot :use="$slots.subtitle" unwrap="p" />
        </div>
        <slot />
        <div v-if="$slots.cta" class="flex gap-2 mt-4">
          <ContentSlot :use="$slots.cta" unwrap="p" />
        </div>
        <Slot v-if="$slots.extra" class="text-sm text-gray-500 dark:text-gray-300">
          <ContentSlot :use="$slots.extra" />
        </Slot>
      </div>
    </div>
    <div class="relative w-full min-h-370px flex items-center justify-center" xl="w-1/2" lg="block w-2/5">
      <Slot v-if="$slots.image" class="absolute inset-0 h-full w-full object-scale-down">
        <ContentSlot :use="$slots.image" unwrap="p" />
      </Slot>
    </div>
  </div>
</template>
