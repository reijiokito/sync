<script lang="ts" setup>
import { VideoPlayer } from '@videojs-player/vue'
const { } = definePropsRefs<{
  left?: boolean
}>()
const { data } = await useAsyncData('pte', () => queryContent().where({ _partial: true }).findOne())

const videos = computed(() => data.value.body)

const selectedIndex = ref(0)
const video = computed(() => videos.value[selectedIndex.value].src)
const metrics = await Promise.all(videos.value.map(video => $fetch<any>(video.metric, { responseType: 'json' })))
const res = computed(() => metrics[selectedIndex.value])
const currentTime = ref(1)

const pteData = computed(() => {
  const data = res.value[0].times as any[]
  return data.map(item => parseFloat(item.rate.toFixed(2)))
})

const defaultData = computed(() => {
  const data = res.value[1].times as any[]
  return data.map(item => parseFloat(item.rate.toFixed(2)))
})

function timeUpdate(e: any) {
  const player = e.target.player
  currentTime.value = player.currentTime()
}

const currentIndex = computed(() => Math.round(currentTime.value / 2))
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
    <div class="flex gap-12px bg-accent px-24px py-32px rounded-8px ">

      <div class="grid gap-12px">
        <div v-for="(item, i) in videos" class="relative w-160px h-90px rounded-8px of-hidden cursor-pointer"
          :class="[i === selectedIndex ? 'ring-3px ring-primary' : '']" @click="selectedIndex = i">
          <NuxtImg class="absolute inset-0" :src="item.thumb" />
          <div class="absolute bottom-2 right-2 text-white font-bold">
            <div>{{ item.reso }}</div>
          </div>
        </div>
      </div>
      <div :key="selectedIndex" class="flex-1 relative grid grid-cols-3 gap-12px">
        <div class="col-span-2">
          <div class="mb-2 text-base">
            <div class="font-bold text-primary text-lg">
              {{ res[0].name }}
            </div>
            <div>
              {{ videos[selectedIndex].reso2 }}
            </div>
            <div class="font-bold">
              {{ res[0].vbr_size }}MB
            </div>

          </div>
          <VideoPlayer aspect-ratio="16:9" :poster="videos[selectedIndex].thumb" :controls="true" :src="video"
            :loop="true" :volume="0" @mounted="() => { }" @ready="() => { }" @play="() => { }" @pause="() => { }"
            @ended="() => { }" @timeupdate="timeUpdate">
            <template #="{ player, state }">
              <div class="absolute inset-0 group" lt-lg="hidden">
                <ImgComparisonSlider class="w-full h-full relative">
                  <template #first>
                    <div class="slotted w-full h-full"></div>

                  </template>
                  <template #second>

                  </template>
                </ImgComparisonSlider>
                <SButton variant="white" as="a" v-if="!state.playing" @click="player.play()"
                  class="absolute z-100 top-1/2 !rounded-full left-1/2 cursor-pointer translate-x--1/2 translate-y--1/2">
                  Play video
                  <i class="i-ri:play-fill" />
                </SButton>

                <div
                  class="text-sm bg-white hidden group-hover:block shadow transition-all text-black px-4 py-1.5 rounded-3 absolute top-32px left-1/2 translate-x-[calc(-100%-48px)]">
                  <div class="flex justify-between gap-8">
                    <div>
                      Standard Static
                    </div>
                    <div class="font-bold ">
                      <div>{{ res[0].vbr_size }}MB</div>
                    </div>
                  </div>
                  <div class="flex justify-between gap-8">
                    <div>
                      Encoding Seting
                    </div>
                    <div class="font-bold">
                      {{ videos[selectedIndex].reso3 }} H.264
                    </div>
                  </div>
                </div>

                <div
                  class="text-sm bg-white hidden group-hover:block shadow transition-all text-black px-4 py-1.5 rounded-3 absolute top-32px left-1/2 translate-x-[calc(48px)]">
                  <div class="flex justify-between gap-8">
                    <div class="font-bold text-primary">
                      Sigma ncode
                    </div>
                    <div class="font-bold text-primary">
                      <div>{{ res[0].pte_size }}MB</div>
                    </div>
                  </div>
                  <div class="flex justify-between gap-8">
                    <div>
                      Per-Title Encoding </div>
                    <div class="font-bold">
                      {{ videos[selectedIndex].reso3 }} H.264
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </VideoPlayer>
        </div>

        <div class="flex-shrink-0 mt-10">
          <div>
            <div class="text-lg text-primary font-bold">
              Bitrate
            </div>
            <BitrateEchart class="mt-2" :current-index="currentIndex" :defaultData="defaultData" :pteData="pteData" />
          </div>
          <div class="mt-4">
            <div class="text-lg text-primary font-bold">
              Performance
            </div>
            <div class="text-sm font-500 mt-2">
              <div class="flex justify-between gap-8">
                <div>Per Title Segment Data</div>
                <div>{{ res[0].pte_size }}MB</div>
              </div>
              <div class="flex justify-between gap-8">
                <div>Default Segment Data</div>
                <div>{{ res[0].vbr_size }}MB</div>
              </div>
              <div class="flex justify-between gap-8">
                <div>Saving</div>
                <div>{{ Math.max(Math.round((res[0].vbr_size - res[0].pte_size) / res[0].vbr_size * 100), 0) }}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@import 'video.js/dist/video-js.css';

.video-js .vjs-control-bar {
  z-index: 100;
}

.video-js .vjs-big-play-button {
  display: none;
}
</style>
