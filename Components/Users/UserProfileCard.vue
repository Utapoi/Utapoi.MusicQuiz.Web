<script setup lang="ts">
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'

const IdentityStore = useIdentityStore()
</script>

<template>
  <div class="w-full border-rounded-lg bg-latte-surface2 p-3 font-serif shadow dark:bg-mocha-surface2">
    <NuxtLink to="/profile" class="flex items-center gap-2">
      <div>
        <div v-if="IdentityStore.HasAvatar()">
          <NuxtImg :src="IdentityStore.GetAvatar()" class="h-full w-full border-rounded-md object-cover object-center" />
        </div>
        <div v-else-if="IdentityStore.IsAuthenticated() && !IdentityStore.HasAvatar()" class="h-12 w-12 flex items-center justify-center border-rounded-md bg-latte-overlay0 dark:bg-mocha-overlay0">
          <NuxtImg src="/images/UserAvatar_Placeholder.png" class="h-full w-full border-rounded-md object-cover object-top" />
        </div>
        <div v-else class="h-12 w-12 flex items-center justify-center border-rounded-md bg-latte-overlay0 dark:bg-mocha-overlay0">
          <!-- Replace with avatar placeholder -->
          <NuxtImg src="/images/UserAvatar_Placeholder.png" class="h-full w-full border-rounded-md object-cover object-top" />
          G
        </div>
      </div>
      <div class="flex flex-col items-start gap-1 font-sans">
        <p v-if="IdentityStore.IsAuthenticated()">
          {{ IdentityStore.GetUsername() }}
        </p>
        <p v-else>
          Guest
        </p>
        <p class="border-rounded-xl bg-latte-lavender px-2 py-0.5 text-xs text-latte-base dark:bg-mocha-lavender dark:text-mocha-base">
          Lv. 1
        </p>
        <!-- TODO: Profile Info: Lvl / Country / etc... -->
      </div>
    </NuxtLink>
  </div>
</template>
