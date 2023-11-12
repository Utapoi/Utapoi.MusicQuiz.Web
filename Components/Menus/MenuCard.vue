<script setup lang="ts">
import { useAudioManager } from '~/Composables/Managers/AudioManager'
import { TRIANGLE_PARTICLES_OPTIONS } from '~/Core/Constants/ParticlesOptions'

export interface IMenuCardProps {
  title?: string
  icon?: string
  image: string
  link: string
}

// Props
const Props = defineProps<IMenuCardProps>()

// Composables
const AudioManager = useAudioManager()

// Refs
const IsHovered = ref<boolean>(false)

// Computed
const ImageBg = computed(() => {
  return `url(${Props.image})`
})

// Methods
function OnMouseEnter() {
  IsHovered.value = true
  AudioManager.PlaySound('Hover_01')
}

function OnMouseLeave() {
  IsHovered.value = false
}

function OnClick() {
  AudioManager.PlaySound('Click_01')
}
</script>

<template>
  <NuxtLink
    :to="link"
    :target="link.startsWith('http') ? '_blank' : '_self'"
    class="custom-grid-item transform-gpu bg-white p-1.5 transition-all duration-100 !hover:scale-105 !hover:-rotate-45"
    @mouseenter="OnMouseEnter"
    @mouseleave="OnMouseLeave"
    @click.prevent="OnClick"
  >
    <div class="rhombus menu-card-bg h-full w-full bg-cover">
      <div class="h-full w-full bg-black/75">
        <SimplifiedParticles
          :options="TRIANGLE_PARTICLES_OPTIONS"
        />
        <div v-if="icon" class="h-full w-full flex items-center justify-center text-4xl font-semibold uppercase text-white">
          <p :class="icon" />
        </div>
        <div v-if="title" class="h-full flex items-center justify-center text-2xl font-semibold uppercase text-white">
          {{ title }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<!-- ! This should be set by the parent, not the child. -->
<style scoped>
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

.menu-card-bg {
  background-image: v-bind(ImageBg)
}
</style>
