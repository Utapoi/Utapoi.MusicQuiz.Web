<template>
  <Suspense>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Suspense>
</template>

<style>
html, body , #__nuxt{
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Quicksand", ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
    "Noto Color Emoji";
}

html.dark {
  /* Equivalent of Catppuccin mocha-base */
  background-color: #1e1e2e;
}

html.light {
  /* Equivalent of Catppuccin latte-base */
  background-color: #eff1f5;
}

input {
  outline: none;
  text-decoration: none;
  background-color: none;
  border: none;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.8s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
