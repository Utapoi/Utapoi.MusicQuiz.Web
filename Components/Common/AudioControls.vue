<script setup lang="ts">
import { useAudioManager } from '~/Composables/Managers/AudioManager'
import { useGlobalSettings } from '~/Composables/Stores/GlobalSettingsStore'

const GlobalSettings = useGlobalSettings()
const AudioManager = useAudioManager()

const CurrentTarget = ref<'Effects' | 'Music' | undefined>()
const AreControlsVisible = ref<boolean>(false)

const ShouldHideControls = useTimeoutFn(() => {
  AreControlsVisible.value = false
}, 7000)

// This is definitely a hacky solution because we don't have a native 'onwheelstop' event.
const OnWheelStop = useTimeoutFn(() => {
  ShouldHideControls.start()
}, 200)

window.onwheel = (e) => {
  if (CurrentTarget.value !== undefined)
    AudioManager.PlaySound('Scroll_01', true)

  if (!OnWheelStop.isPending)
    OnWheelStop.stop()

  OnWheelStop.start()

  if (!AreControlsVisible.value)
    AreControlsVisible.value = true

  if (AreControlsVisible.value)
    OnScroll(e)
}

function OnScroll(e: WheelEvent) {
  if (CurrentTarget.value === undefined)
    return

  // Note(Mikyan): The condition is inversed:
  // When scrolling down, we want to decrease the volume.
  // When scrolling up, we want to increase the volume.
  const Value = Math.round(e.deltaY / 100) < 0 ? 1 : -1

  if (CurrentTarget.value === 'Effects')
    GlobalSettings.SetEffectsVolume(Value)
  else if (CurrentTarget.value === 'Music')
    GlobalSettings.SetMusicVolume(Value)
}
</script>

<template>
  <div
    v-if="AreControlsVisible"
    v-motion-slide-right
    class="absolute right-6 top-35% z-5"
  >
    <div class="flex flex-col items-end gap-6">
      <!-- Effects Volume -->
      <div class="flex items-center gap-3 font-sans">
        <div class="inline-flex items-center justify-center rounded-full bg-latte-surface0 px-3 pt-1 uppercase text-latte-text shadow dark:bg-mocha-surface0 dark:text-mocha-text">
          Effects
        </div>
        <div
          class="relative cursor-pointer select-none rounded-full bg-latte-surface0 p-2 transition-all duration-105 hover:scale-105 dark:bg-mocha-surface0"
          @mouseenter="CurrentTarget = 'Effects'"
          @mouseleave="CurrentTarget = undefined"
        >
          <p class="absolute left-50% top-50% text-xl text-latte-text -translate-x-50% -translate-y-50% dark:text-mocha-text">
            {{ GlobalSettings.GetRawEffectsVolume() }}
          </p>
          <ProgressRing
            :radius="50" :progress="GlobalSettings.GetRawEffectsVolume()" :stroke="5" color="#fff" class="z-3"
          />
        </div>
      </div>

      <!-- Music Volume -->
      <div class="flex items-center gap-3 font-sans">
        <div class="inline-flex items-center justify-center rounded-full bg-latte-surface0 px-3 pt-1 uppercase text-latte-text shadow dark:bg-mocha-surface0 dark:text-mocha-text">
          Music
        </div>
        <div
          class="relative cursor-pointer select-none rounded-full bg-latte-surface0 p-2 transition-all duration-105 hover:scale-105 dark:bg-mocha-surface0 hover:shadow-lg"
          @mouseenter="CurrentTarget = 'Music'"
          @mouseleave="CurrentTarget = undefined"
        >
          <p class="absolute left-50% top-50% text-xl text-latte-text -translate-x-50% -translate-y-50% dark:text-mocha-text">
            {{ GlobalSettings.GetRawMusicVolume() }}
          </p>
          <ProgressRing
            :radius="50" :progress="GlobalSettings.GetRawMusicVolume()" :stroke="4" color="#fff"
          />
        </div>
      </div>
    </div>
  </div>
</template>
