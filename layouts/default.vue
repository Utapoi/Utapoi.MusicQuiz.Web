<script setup lang="ts">
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'

const IdentityStore = useIdentityStore()

IdentityStore.GetCurrentUser()
</script>

<template>
  <!-- Make AudioControls available everywhere. -->
  <AudioControls />

  <div class="h-full overflow-hidden">
    <header>
      <MenuBar />
    </header>
    <main class="h-screen w-screen">
      <slot />
    </main>
  </div>
</template>
