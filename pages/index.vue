<script setup lang="ts">
</script>

<template>
  <div class="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
    <h1 class="absolute top-24 text-2xl font-semibold text-latte-red dark:text-mocha-red">
      <!-- TODO: Logo ? -->
      Utapoi Music Quiz
    </h1>
    <div class="flex flex-col items-center gap-6">
      <NuxtLink to="/home" class="w-36 border-rounded-full py-2 text-center font-semibold uppercase text-latte-red ring-2 ring-latte-red transition-all duration-150 hover:bg-latte-red/25 dark:text-mocha-red hover:text-latte-text dark:ring-mocha-red hover:dark:bg-mocha-red/25 hover:dark:text-mocha-text">
        <p>Login</p>
      </NuxtLink>
      <div to="/home" class="border-rounded-full px-6 py-2 text-center font-semibold uppercase text-latte-blue ring-2 ring-latte-blue dark:text-mocha-blue">
        <p>Continue as Guest</p>
      </div>
    </div>
  </div>
</template>
