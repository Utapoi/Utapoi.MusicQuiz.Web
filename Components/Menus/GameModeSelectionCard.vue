<script setup lang="ts">
import type { Engine } from 'tsparticles-engine'
import { loadFull } from 'tsparticles'
import { useGlobalSettings } from '~/Composables/Stores/GlobalSettingsStore'

export interface IGameModeSelectionCardProps {
  title: string
  subtitle: string
}

defineProps<IGameModeSelectionCardProps>()

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
}

async function InitParticles(engine: Engine) {
  await loadFull(engine)
}

const ParticlesOptions = reactive({
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        area: 400,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'triangle',
      stroke: {
        width: 1,
        color: '#efefef',
        opacity: 0.5,
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 12.783201938177186,
      random: true,
      anim: {
        enable: false,
        speed: 20,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.734960581453156,
      direction: 'top',
      random: true,
      straight: true,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'connect',
      },
      resize: false,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
})
</script>

<template>
  <div
    class="h-4/5 transform-gpu cursor-pointer bg-latte-surface1 p-1 transition-all duration-115 hover:scale-105 dark:bg-white"
    @mouseenter="OnMouseEnter"
    @click.prevent="OnClick"
  >
    <div class="h-full w-full bg-[url(/images/HomeScreen_Wallpaper.png)] bg-cover bg-top">
      <div class="h-full w-full bg-black/75">
        <div class="h-full w-full">
          <Particles
            :id="`particles-${title}`"
            :particles-init="InitParticles"
            :options="ParticlesOptions"
          />
          <div class="h-full w-full flex flex-col items-center justify-center gap-2">
            <p class="text-3xl font-semibold uppercase">
              {{ title }}
            </p>
            <p class="border-rounded-full bg-latte-lavender px-2 text-sm uppercase text-latte-base dark:bg-mocha-lavender dark:text-mocha-base">
              {{ subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
