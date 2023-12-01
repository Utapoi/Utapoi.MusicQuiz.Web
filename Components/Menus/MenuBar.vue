<script setup lang="ts">
import { WebSocketConnectionStatus, useWebSocketsStore } from '~/Composables/Stores/WebSocketsStore'

const { isFullscreen, toggle } = useFullscreen()

const WebSocketsStore = useWebSocketsStore()
</script>

<template>
  <div class="absolute inset-0 z-5 h-12 w-full bg-latte-surface0 text-latte-text shadow dark:bg-mocha-surface0 dark:text-mocha-text">
    <div class="flex items-center justify-between">
      <!-- Left Menu -->
      <div class="flex items-center gap-1 pl-3">
        <MenuButton
          icon="i-fluent:home-32-regular"
          link="/"
        />

        <MenuButton
          :icon="isFullscreen ? 'i-fluent:full-screen-minimize-24-regular' : 'i-fluent:full-screen-maximize-24-regular'"
          @on-click="toggle"
        />

        <MenuButton
          icon="i-fluent:settings-32-regular"
          link="/settings"
        />
      </div>

      <!-- User Info / Settings -->
      <div class="h-12 flex items-center justify-center gap-1 pr-3">
        <div
          v-if="WebSocketsStore.ConnectionStatus === WebSocketConnectionStatus.Connected"
          title="Connected to Utapoi Server"
          class="i-fluent:arrow-sync-checkmark-20-filled mr-2 cursor-pointer text-xl text-latte-green dark:text-mocha-green"
        />
        <div
          v-else-if="WebSocketsStore.ConnectionStatus === WebSocketConnectionStatus.Connecting || WebSocketsStore.ConnectionStatus === WebSocketConnectionStatus.Reconnecting"
          title="Reconnecting to Utapoi Server"
          class="i-arrow-sync-circle-24-regular cursor-pointer text-orange-400 dark:text-orange-300"
        />
        <div
          v-else
          title="Disconnected from Utapoi Server"
          class="i-fluent:arrow-sync-dismiss-24-filled cursor-pointer text-red-400 dark:text-red-300"
        />
        <UserAvatar />
        <DarkToggle class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25" />
        <div class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25">
          <div class="i-fluent:alert-32-regular" />
        </div>
      </div>
    </div>
  </div>
</template>
