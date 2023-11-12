<script setup lang="ts">
import { useAudioManager } from '~/Composables/Managers/AudioManager'

export interface IGameModeSelectionCardProps {
  title: string
  subtitle: string
}

// Props
defineProps<IGameModeSelectionCardProps>()

// Emits
const Events = defineEmits<{
  onClick: []
}>()

// Composables
const AudioManager = useAudioManager()

// Refs
const IsHovered = ref<boolean>(false)

// Methods
function OnMouseEnter() {
  IsHovered.value = true

  AudioManager.PlaySound('Hover_01')
}

function OnMouseLeave() {
  IsHovered.value = false
}

async function OnClick() {
  AudioManager.PlaySound('Click_01')

  Events('onClick')
}
</script>

<template>
  <div
    class="h-4/5 transform-gpu cursor-pointer pl-1 transition-all duration-115 hover:scale-105"
    :class="{
      'bg-latte-surface1 dark:bg-white': IsHovered,
      'bg-latte-surface2 dark:bg-black': !IsHovered,
    }"
    @mouseenter="OnMouseEnter"
    @mouseleave="OnMouseLeave"
    @click.prevent="OnClick"
  >
    <div class="h-full w-full bg-[url(/images/HomeScreen_Wallpaper.png)] bg-cover bg-top">
      <div class="h-full w-full backdrop-blur-sm">
        <div class="h-full w-full pl-1">
          <div class="h-full w-full flex flex-col justify-between py-4 font-sans">
            <div
              class="relative shadow-md -mt-10"
            >
              <div class="ml-12 mr-2 flex items-center bg-latte-surface0 py-2 text-latte-subtext1 dark:bg-black dark:text-white">
                <p
                  class="pl-4 text-left text-2xl font-sans uppercase"
                >
                  {{ title }}
                </p>
              </div>
            </div>
            <p
              class="bg-black/75 px-2 py-1 text-sm"
              :class="{
                'text-latte-text dark:text-white': IsHovered,
                'text-latte-subtext1 dark:text-mocha-subtext1': !IsHovered,
              }"
            >
              {{ subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
