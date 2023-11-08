<script setup lang="ts">
import { useGlobalSettings } from '~/Composables/Stores/GlobalSettingsStore'

export interface IMenuButtonProps {
  icon: string
  link?: string | undefined
}

const Props = defineProps<IMenuButtonProps>()

const Events = defineEmits<{
  (e: 'onClick'): void
}>()

const Router = useRouter()
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
  if (ClickSound.playing()) {
    if (Props.link === undefined)
      return

    await Router.push(Props.link)
  }

  ClickSound.play()
  Events('onClick')

  if (Props.link === undefined)
    return

  await Router.push(Props.link)
}
</script>

<template>
  <div
    v-motion
    :clicked="{ scale: 0.95 }"
    :delay="115"
    class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25"
    @mouseenter="OnMouseEnter"
    @click.prevent="OnClick"
  >
    <div :class="`i-${icon}`" />
  </div>
</template>
