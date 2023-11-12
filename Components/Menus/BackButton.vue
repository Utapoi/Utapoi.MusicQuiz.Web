<script setup lang="ts">
import { useAudioManager } from '~/Composables/Managers/AudioManager'

const Router = useRouter()
const AudioManager = useAudioManager()

function OnMouseEnter() {
  AudioManager.PlaySound('Hover_01')
}

async function OnClick() {
  AudioManager.PlaySound('Click_01')

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
      <!-- Makes everything laggy and I don't know why. -->
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
