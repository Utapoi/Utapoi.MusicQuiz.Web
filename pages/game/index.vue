<!--
    ==== Game Page ====

    The main gameplay loop will be handled here.
    I have no idea for the UI...
 -->
<script setup lang="ts">
useHead({
  title: 'Music Quiz | Utapoi',
})

const ShowResults = ref(false)

useTimeoutFn(() => {
  ShowResults.value = true
}, 10000)
</script>

<template>
  <div class="h-full w-full bg-[url(/images/HomeScreen_Wallpaper.png)] bg-cover">
    <div class="h-full w-full flex flex-col bg-black/50 pb-4 pt-24 backdrop-blur-md">
      <!-- Grid #1 -->
      <div class="h-full w-full">
        <!-- Did some test with WaveSurfer.js, not really engaging visuals. -->
        <!-- The best solution would probably be an Audio Visualizer around the screen with a placeholder for the response at the top -->
        <div class="relative mx-auto h-76 w-76 ring-3 ring-white">
          <NuxtImg
            v-if="ShowResults"
            v-motion-pop
            src="https://static.wikia.nocookie.net/senkizesshousymphogear/images/8/87/Symphogear_GX_volume_1_cover.jpg"
            class="absolute h-full w-full object-cover shadow-lg -right-4 -top-4"
          />
        </div>
      </div>

      <!-- Grid #2 -->
      <div class="w-full font-sans">
        <div class="mx-auto w-76 rounded-full bg-latte-surface1 p-3 text-latte-subtext0 dark:bg-mocha-surface1 dark:text-mocha-subtext0">
          Search singers, songs, ...
        </div>
      </div>

      <!-- Grid #3 -->
      <div class="h-full w-full inline-flex">
        <!-- TODO: Probablement transformer en carousel si on veut pouvoir faire des rooms de +9 personnes... -->
        <div class="w-full flex items-end justify-center gap-4">
          <PlayerCard v-for="i in 8" :key="i" :is-host="i === 1" :current-ranking="i" />
        </div>
      </div>
    </div>
  </div>
</template>
