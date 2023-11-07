<script setup lang="ts">
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'

const Route = useRoute()
const IdentityStore = useIdentityStore()

if (IdentityStore.IsAuthenticated())
  IdentityStore.GetCurrentUser()

// This is a temporary function until we have a proper login page
async function OnLogInClicked(): Promise<void> {
  await IdentityStore.LogInAsync('test', 'Test123$')
}
</script>

<template>
  <div class="h-full overflow-y-hidden">
    <header>
      <MenuBar />
    <!-- <section class="w-full px-6">
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
            <div v-if="IdentityStore.IsAuthenticated()" class="text-latte-text dark:text-mocha-text">
              {{ IdentityStore.GetUsername() }}
            </div>
            <div v-else class="cursor-pointer text-latte-red dark:text-mocha-red" @click.prevent="OnLogInClicked">
              Log In
            </div>
            <DarkToggle />
          </div>
        </div>
      </div>
    </section> -->
    </header>
    <main class="h-screen w-screen">
      <slot />
    </main>
  </div>
</template>
