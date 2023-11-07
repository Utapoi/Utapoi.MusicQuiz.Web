<script setup lang="ts">
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'

const IdentityStore = useIdentityStore()

IdentityStore.GetCurrentUser()
</script>

<template>
  <div class="h-full overflow-y-hidden">
    <header>
      <MenuBar />
    </header>
    <main class="h-screen w-screen">
      <slot />
    </main>
  </div>
</template>
