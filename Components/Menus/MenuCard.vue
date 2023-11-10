<script setup lang="ts">
import { Howl } from 'howler'
import { useGlobalSettings } from '~/Composables/Stores/GlobalSettingsStore'
import { useTriangleParticles } from '~/Composables/Common/TriangleParticles'

export interface IMenuCardProps {
  title?: string
  icon?: string
  image: string
  link: string
}

const Props = defineProps<IMenuCardProps>()

const TriangleParticles = useTriangleParticles()
const GlobalSettings = useGlobalSettings()

const CardRef = ref<HTMLElement | null>(null)

const ImageBg = computed(() => {
  return `url(${Props.image})`
})

const IsHovered = ref<boolean>(false)

const HoverSound = computed(() => new Howl({
  src: ['/sfx/Button_Hover.ogg'],
  volume: GlobalSettings.GetEffectsVolume(),
}))

const ClickSound = computed(() => new Howl({
  src: ['/sfx/Button_Click.ogg'],
  volume: GlobalSettings.GetEffectsVolume(),
}))

function OnMouseEnter() {
  IsHovered.value = true

  if (HoverSound.value.playing())
    return

  HoverSound.value.play()
}

function OnMouseLeave() {
  IsHovered.value = false
}

async function OnClick() {
  if (ClickSound.value.playing())
    return

  ClickSound.value.play()
}
</script>

<template>
  <NuxtLink
    ref="CardRef"
    :to="link"
    :target="link.startsWith('http') ? '_blank' : '_self'"
    class="custom-grid-item transform-gpu bg-white p-1.5 transition-all duration-100 !hover:scale-105 !hover:-rotate-45"
    @mouseenter="OnMouseEnter"
    @mouseleave="OnMouseLeave"
    @click.prevent="OnClick"
  >
    <div class="rhombus menu-card-bg h-full w-full bg-cover">
      <div class="h-full w-full bg-black/75">
        <Particles
          :id="`particles-${title}-${icon}`"
          :particles-init="TriangleParticles.Initialize"
          :options="TriangleParticles.ParticlesOptions"
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
