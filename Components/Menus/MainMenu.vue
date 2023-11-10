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
    <div class="mt-24 h-full w-full flex items-center justify-start lg:pl-3%">
      <div class="custom-grid">
        <!-- Multiplayer -->
        <!-- Will probably change to a submenu system: Ranked -> Solo / Duo / Team / Back -->
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

        <!-- Profile -->
        <MenuCard
          title="Profile"
          image="/images/Button_Profile_Background.png"
          link="/profile"
        />

        <!-- Play -->
        <!-- Will probably change to a submenu system: Play -> Singleplayer / Multiplayer / Back -->
        <MenuCard
          title="Singleplayer"
          image="/images/Button_Solo_Background.png"
          link="/game/mode"
        />

        <div class="custom-grid-2 !rotate-0">
          <MenuCard
            icon="i-mdi:discord"
            image="/images/Button_Profile_Background.png"
            link="/profile"
          />
          <MenuCard
            icon="i-mdi:twitter"
            image="/images/Button_Profile_Background.png"
            link="/profile"
          />
          <MenuCard
            icon="i-mdi:patreon"
            image="/images/Button_Profile_Background.png"
            link="https://www.patreon.com/utapoi"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<!-- TODO: Make this responsive to some degree. At least until landscape on mobile (we'll force landscape to play.) -->
<!-- TODO: Better naming for css classes, more separation and controls over sizes. -->
<!-- ? Maybe move this to a separate file -->
<!-- We should use v-bind(Size) instead of --s -->
<!-- And v-bind(ItemsCount) for the number of item of the grid -->
<style scoped>
.custom-grid {
  --s: 14rem; /* control the size */
  display: grid;
  grid: auto-flow var(--s) / repeat(3,var(--s));
  gap: 10px;
  place-items: center;
  margin: calc(var(--s)/3);
  transform: rotate(45deg);
}

.custom-grid-2 {
  --s: 6.75rem; /* control the size */
  display: grid;
  grid: auto-flow var(--s) / repeat(2,var(--s));
  gap: 5px;
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
