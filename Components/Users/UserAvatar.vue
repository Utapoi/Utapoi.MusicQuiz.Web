<script setup lang="ts">
import { useAudioManager } from '~/Composables/Managers/AudioManager'
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'

// Composables
const IdentityStore = useIdentityStore()
const Route = useRoute()
const AudioManager = useAudioManager()

// Refs
const UserAvatarRef = ref<HTMLElement | null>(null)
const IsOpen = ref<boolean>(false)

// Methods
function OnMouseEnter() {
  AudioManager.PlaySound('Hover_01')
}

function OnClick() {
  IsOpen.value = true
}

watch(IsOpen, () => {
  AudioManager.PlaySound('Panel_Open_01')
})

watch(() => Route.fullPath, (_) => {
  IsOpen.value = false
}, { deep: true, immediate: true })
</script>

<template>
  <div
    ref="UserAvatarRef"
    class="h-full cursor-pointer select-none bg-latte-surface1 px-3 text-latte-text shadow-xl shadow-inset dark:bg-mocha-surface1 dark:text-mocha-text"
    @mouseenter="OnMouseEnter"
    @click.prevent="OnClick"
  >
    <div class="h-full flex items-center justify-center gap-2 px-2">
      <div>
        <span v-if="IdentityStore.IsAuthenticated()">{{ IdentityStore.GetUsername() }}</span>
        <span v-else>Guest</span>
      </div>
      <div>
        <div v-if="IdentityStore.HasAvatar()">
          a
        </div>
        <div v-else-if="IdentityStore.IsAuthenticated() && !IdentityStore.HasAvatar()" class="h-8 w-8 flex items-center justify-center border-rounded-md bg-latte-overlay0 dark:bg-mocha-overlay0">
          <!-- Replace with avatar placeholder -->
          <NuxtImg src="/images/UserAvatar_Placeholder.png" class="h-full w-full border-rounded-md object-cover object-top" />
        </div>
        <div v-else class="h-8 w-8 flex items-center justify-center border-rounded-md bg-latte-overlay0 dark:bg-mocha-overlay0">
          <!-- Replace with avatar placeholder -->
          <NuxtImg src="/images/UserAvatar_Placeholder.png" class="h-full w-full border-rounded-md object-cover object-top" />
          G
        </div>
      </div>
    </div>
  </div>
  <Teleport v-if="UserAvatarRef && IsOpen" to="body" class="relative">
    <div
      v-motion-slide-visible-top
      class="absolute right-2 z-1 w-74 flex flex-col gap-4 rounded-xl bg-latte-surface1 p-3 text-latte-text shadow dark:bg-mocha-surface1 dark:text-mocha-text"
      :style="{
        top: `${UserAvatarRef.getBoundingClientRect().bottom + useWindowScroll().y.value + 4 ?? 0 + 50}px`,
        width: `${UserAvatarRef.getBoundingClientRect().width * 4}px`,
      }"
    >
      <UserProfileCard v-if="IdentityStore.IsAuthenticated()" />
      <div v-if="IdentityStore.IsAuthenticated()">
        <div
          class="mx-auto w-1/2 cursor-pointer border-rounded-full bg-latte-red py-1 text-center uppercase text-latte-base transition-all duration-150 dark:bg-mocha-red hover:bg-latte-red/75 dark:text-mocha-base hover:dark:bg-mocha-red/75"
          @click.prevent="IdentityStore.LogOutAsync"
        >
          Log Out
        </div>
      </div>
      <div v-else>
        <LogInForm />
      </div>
    </div>
    <div
      class="absolute inset-0 z-0 h-full w-full bg-latte-surface0/25 dark:bg-mocha-surface0/25"
      @click.self="IsOpen = false"
    />
  </Teleport>
</template>
