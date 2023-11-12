<script setup lang="ts">
import { useAudioManager } from '~/Composables/Managers/AudioManager'

export interface IMenuButtonProps {
  icon: string
  link?: string | undefined
}

// Props
defineProps<IMenuButtonProps>()

// Emits
const Events = defineEmits<{
  (e: 'onClick'): void
}>()

// Composables
const AudioManager = useAudioManager()

// Methods
function OnMouseEnter() {
  AudioManager.PlaySound('Hover_01')
}

function OnClick() {
  AudioManager.PlaySound('Click_01')

  Events('onClick')
}
</script>

<template>
  <NuxtLink
    v-if="link !== undefined"
    :to="link"
    :target="link.startsWith('http') ? '_blank' : '_self'"
    class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25"
    @mouseenter="OnMouseEnter"
    @click.prevent="OnClick"
  >
    <div :class="`${icon}`" />
  </NuxtLink>
  <div
    v-else
    class="cursor-pointer p-2 text-latte-text transition-all duration-150 hover:border-rounded-md hover:bg-latte-overlay0/25 dark:text-mocha-text !outline-none hover:dark:bg-mocha-overlay0/25"
    @mouseenter="OnMouseEnter"
    @click.prevent="OnClick"
  >
    <div :class="`${icon}`" />
  </div>
</template>
