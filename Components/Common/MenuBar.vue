<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <div class="h-12 w-full bg-latte-surface0 text-latte-text shadow dark:bg-mocha-surface0 dark:text-mocha-text">
    <div class="flex items-center justify-between">
      <!-- Left Menu -->
      <div class="flex items-center gap-1 pl-3">
        <NuxtLink to="/" class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25">
          <div class="i-fluent:home-32-regular" />
        </NuxtLink>

        <div
          class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25"
          @click.prevent="toggle"
        >
          <div
            :class="{
              'i-fluent:full-screen-minimize-24-regular': isFullscreen,
              'i-fluent:full-screen-maximize-24-regular': !isFullscreen,
            }"
          />
        </div>
        <div class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25">
          <div class="i-fluent:settings-32-regular" />
        </div>
      </div>

      <!-- User Info / Settings -->
      <div class="h-12 flex items-center justify-center gap-1 pr-3">
        <UserAvatar />
        <DarkToggle class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25" />
        <div class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25">
          <div class="i-fluent:alert-32-regular" />
        </div>
      </div>
    </div>
  </div>
</template>
