<script setup lang="ts">
</script>

<template>
  <div class="h-12 w-full bg-latte-surface0 text-latte-text dark:bg-mocha-surface0 dark:text-mocha-text">
    <div class="flex items-center justify-between">
      <!-- Left Menu -->
      <div class="flex items-center gap-1 pl-3">
        <div class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25">
          <div class="i-fluent:settings-32-regular" />
        </div>
      </div>

      <!-- User Info / Settings -->
      <div class="h-12 flex items-center justify-center gap-1 pr-3">
        <UserAvatar class="mr-2 h-full" />
        <DarkToggle class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25" />
        <div class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25">
          <div class="i-fluent:alert-32-regular" />
        </div>
      </div>
    </div>
  </div>
</template>
