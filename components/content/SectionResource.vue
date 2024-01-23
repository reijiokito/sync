<script lang="ts" setup>
import { register } from 'swiper/element/bundle'
definePropsRefs<{
  left?: boolean
}>()

register()

const swiperRef = ref()

const spaceBetween = 24

function prev() {
  swiperRef.value.swiper.slideNext()
}

function next() {
  swiperRef.value.swiper.slidePrev()
}
</script>

<template>
  <section>
    <SectionTitle v-if="$slots.title || $slots.subtitle" :left="left">
      <template #title>
        <ContentSlot :use="$slots.title" unwrap="p" />
      </template>
      <template #subtitle>
        <ContentSlot :use="$slots.subtitle" unwrap="p" />
      </template>
    </SectionTitle>
  </section>
  <div class="my-10 gap-24px container relative">
    <swiper-container ref="swiperRef" class="swiper-config" :slides-per-view="3" :space-between="spaceBetween"
      :breakpoints="{
        768: {
          slidesPerView: 3,
        },
      }" :free-mode="true" :loop="true">
      <ContentSlot :use="$slots.default" unwrap="p" />
    </swiper-container>
    <SButton variant="outline"
      class="flex-center absolute left-0 top-1/2 translate-y--1/2 -translate-x-full  !rounded-full !h-40px !w-40px !p-0" @click="next">
      <div class="i-ri:arrow-left-s-line text-24px" />
    </SButton>
    <SButton variant="outline"
      class="flex-center absolute right-0 top-1/2 translate-y--1/2 translate-x-full !rounded-full !h-40px !w-40px !p-0" @click="prev();">
      <div class="i-ri:arrow-right-s-line text-24px" />
    </SButton>
  </div>
</template>

<style>
.swiper-config {
  --swiper-theme-color: hsl(var(--primary));
}
</style>
