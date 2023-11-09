<script setup lang="ts">
</script>

<!-- ? Note(Mikyan): Something is missing here. Not really satisfied with the current design. -->
<!-- ! Let's move on for now... -->
<template>
  <div class="h-full w-full flex items-center justify-center bg-[url(/images/HomeScreen_Wallpaper.png)] text-latte-text dark:text-mocha-text">
    <div class="h-full w-full bg-black/75 backdrop-blur-xl">
      <div class="grid grid-cols-4 mx-auto h-full max-w-7xl w-full select-none items-center gap-6 -mt-10">
        <!-- Mode #1: Songs + Singers -->
        <GameModeSelectionCard
          title="Songs + Singers"
          subtitle="Random / Collections"
        />

        <!-- Mode #2: Singers Only -->
        <GameModeSelectionCard
          title="Singers"
          subtitle="Random / Collections"
        />

        <!-- Mode #3: Songs Only (Random) -->
        <GameModeSelectionCard
          title="Songs"
          subtitle="Random / Collections"
        />

        <!-- Mode #$: Songs Only (Singer) -->
        <GameModeSelectionCard
          title="Anime Songs"
          subtitle="OP / ED / OST"
        />
      </div>
    </div>
  </div>
</template>
