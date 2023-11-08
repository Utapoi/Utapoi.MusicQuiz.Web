import type { MenuCard } from '#build/components';
<script setup lang="ts">
</script>

        <!-- Solo -->
        <!-- <div class="rhombus-grid-item h-56 w-56">
          <NuxtImg src="/images/Square_Button_With_Background.png" class="h-full w-full object-contain" />
          <div class="absolute inset-0 h-full w-full flex items-center justify-center text-2xl font-semibold uppercase text-white">
            Solo
          </div>
        </div> -->

<template>
  <div class="h-full w-full">
    <div class="h-full w-full flex items-center justify-start pl-12%">
      <div class="custom-grid">
        <!-- Multiplayer -->
        <MenuCard
          title="Multiplayer"
          image="/images/Button_Multi_Background.png"
          link="/multiplayer"
        />

        <!-- Collections -->
        <MenuCard
          title="Collections"
          image="/images/Button_Collections_Background.png"
          link="/collections"
        />

        <!-- Solo -->
        <MenuCard
          title="Singleplayer"
          image="/images/Button_Solo_Background.png"
          link="/singleplayer"
        />

        <!-- Profile -->
        <MenuCard
          title="Profile"
          image="/images/Button_Profile_Background.png"
          link="/profile"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* All this stuff is not really responsive, but we don't plan to support mobile so I suppose its fine. */

.custom-grid {
  --s: 14rem; /* control the size */
  display: grid;
  grid: auto-flow var(--s) / repeat(2,var(--s));
  gap: 10px;
  place-items: center;
  margin: calc(var(--s)/2);
  transform: rotate(45deg);
}

.custom-grid-item {
  width: 141%; /* sqrt(2)*100% */
  aspect-ratio: 1;
  object-fit: cover;
  transform: scale(var(--_t,1)) rotate(-45deg);
  clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
  cursor: pointer;
  transition: .2s linear;
}

.rhombus {
  clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
}
</style>
