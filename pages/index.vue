<script setup lang="ts">
useHead({
  title: 'Utapoi',
})
</script>

<template>
  <!-- This will be the home page -->
  <!-- Just a fullscreen page with a menu : -->
  <!-- Play -> Solo / Multiplayer -->
  <!-- Collections -->
  <div class="relative h-full w-full">
    <div class="h-full w-full">
      <div class="h-full w-full flex items-center justify-center text-latte-text dark:text-mocha-text">
        a
      </div>
    </div>
    <NuxtImg src="/images/Utapoi_Girl_v1.png" class="absolute inset-0 h-full w-full object-cover object-top -z-1" />
    <NuxtImg src="/images/HomeScreen_Wallpaper.png" class="absolute inset-0 h-full w-full object-cover object-top -z-1" />
  </div>
</template>
