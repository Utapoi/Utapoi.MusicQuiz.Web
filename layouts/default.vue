<script setup lang="ts">
const Route = useRoute()
</script>

<template>
  <header>
    <section class="w-full px-6">
      <div class="mx-auto h-16 max-w-7xl w-full flex items-center justify-between">
        <div class="flex items-start gap-1.5">
          <h1 class="text-2xl font-semibold text-[#f90b31]">
            Utapoi
          </h1>
          <span class="text-xs text-latte-subtext0 dark:text-mocha-subtext0">MusicQuiz</span>
        </div>
        <div class="h-full w-full flex items-center justify-center gap-4">
          <NuxtLink to="/">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:text-latte-red hover:dark:text-mocha-red" :class="{ 'text-latte-red dark:text-mocha-red': Route.path === '/', 'text-latte-subtext1 dark:text-mocha-subtext1': Route.path !== '/' }">
              <span class="hidden md:block">Home</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/rooms">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:text-latte-red hover:dark:text-mocha-red" :class="{ 'text-latte-red dark:text-mocha-red': Route.path.includes('/rooms'), 'text-latte-subtext1 dark:text-mocha-subtext1': !Route.path.includes('/rooms') }">
              <span class="hidden md:block">Rooms</span>
            </div>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-4">
            <DarkToggle />
          </div>
        </div>
      </div>
    </section>
  </header>
  <main class="min-h-full w-full">
    <div class="min-h-full w-full">
      <slot />
    </div>
  </main>
</template>
