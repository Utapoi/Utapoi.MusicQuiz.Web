<script setup lang="ts">
import { useGlobalSettings } from '~/Composables/Stores/GlobalSettingsStore'

export interface IGameModeSelectionCardProps {
  title: string
  subtitle: string
}

defineProps<IGameModeSelectionCardProps>()

const Events = defineEmits<{
  onClick: []
}>()

const GlobalSettings = useGlobalSettings()

const IsHovered = ref<boolean>(false)

const HoverSound = new Howl({
  src: ['/sfx/Button_Hover.ogg'],
  volume: GlobalSettings.GetEffectsVolume(),
})

const ClickSound = new Howl({
  src: ['/sfx/Button_Click.ogg'],
  volume: GlobalSettings.GetEffectsVolume(),
})

function OnMouseEnter() {
  IsHovered.value = true

  if (HoverSound.playing())
    return

  HoverSound.play()
}

function OnMouseLeave() {
  IsHovered.value = false
}

async function OnClick() {
  if (ClickSound.playing()) {
    Events('onClick')
    return
  }

  ClickSound.play()
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
