<script setup lang="ts">
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'

const IdentityStore = useIdentityStore()
</script>

<template>
  <div
    class="cursor-pointer bg-latte-surface1 px-3 text-latte-text dark:bg-mocha-surface1 dark:text-mocha-text"
  >
    <div class="h-full flex items-center justify-center gap-2 px-2">
      <div>
        <span v-if="IdentityStore.IsAuthenticated()">{{ IdentityStore.GetUsername() }}</span>
        <span v-else>Guest</span>
      </div>
      <div>
        <div v-if="IdentityStore.HasAvatar()">
          a
        </div>
        <div v-else-if="IdentityStore.IsAuthenticated() && !IdentityStore.HasAvatar()" class="h-8 w-8 flex items-center justify-center border-rounded-md bg-latte-overlay0 dark:bg-mocha-overlay0">
          <!-- Replace with avatar placeholder -->
          {{ IdentityStore.GetUsername()[0].toUpperCase() }}
        </div>
        <div v-else class="h-8 w-8 flex items-center justify-center border-rounded-md bg-latte-overlay0 dark:bg-mocha-overlay0">
          <!-- Replace with avatar placeholder -->
          G
        </div>
      </div>
    </div>
  </div>
</template>
