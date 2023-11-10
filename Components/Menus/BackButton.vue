<script setup lang="ts">
import { useTriangleParticles } from '~/Composables/Common/TriangleParticles'
import { useGlobalSettings } from '~/Composables/Stores/GlobalSettingsStore'

const Router = useRouter()
const TriangleParticles = useTriangleParticles()
const GlobalSettings = useGlobalSettings()

const HoverSound = new Howl({
  src: ['/sfx/Button_Hover.ogg'],
  volume: GlobalSettings.GetEffectsVolume(),
})

const ClickSound = new Howl({
  src: ['/sfx/Button_Click.ogg'],
  volume: GlobalSettings.GetEffectsVolume(),
})

function OnMouseEnter() {
  if (HoverSound.playing())
    return

  HoverSound.play()
}

async function OnClick() {
  if (ClickSound.playing())
    return

  ClickSound.play()
  return Router.back()
}
</script>

<template>
  <div
    class="rectangle h-full w-36 cursor-pointer text-latte-base transition-all duration-105 dark:bg-[#f90b31] dark:text-white"
    @mouseenter="OnMouseEnter"
    @click.prevent="OnClick"
  >
    <div class="relative h-full w-full transition-all duration-105 hover:-translate-x-2">
      <!-- <Particles
        id="back-button-particles"
        :particles-init="TriangleParticles.Initialize"
        :options="TriangleParticles.ParticlesOptions"
        class="absolute"
      /> -->
      <div class="h-full flex items-center justify-center gap-3">
        <div class="i-fluent:arrow-circle-left-24-regular text-2xl" />
        <div>back</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rectangle {
  clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%);
}
</style>
