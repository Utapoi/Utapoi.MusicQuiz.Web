<!-- The In-Game Player Card. -->
<!-- Used only on /game -->

<script setup lang="ts">
import {
  CORRECT_RESPONSE_PARTICLES_OPTIONS,
  INCORRECT_RESPONSE_PARTICLES_OPTIONS,
} from '~/Core/Constants/ParticlesOptions'

export interface IPlayerCardProps {
  isHost: boolean
  currentRanking: number
}

// Props
const Props = defineProps<IPlayerCardProps>()

enum UserResponseState {
  NotAnswered,
  WaitingResult,
  Correct,
  Incorrect,
}

const UserResponse = ref<UserResponseState>(UserResponseState.NotAnswered)

const ShouldShowParticles = computed(() =>
  UserResponse.value !== UserResponseState.NotAnswered
  && UserResponse.value !== UserResponseState.WaitingResult)

const GetParticlesOptions = computed(() => {
  switch (UserResponse.value) {
    case UserResponseState.Correct:
      return CORRECT_RESPONSE_PARTICLES_OPTIONS
    case UserResponseState.Incorrect:
      return INCORRECT_RESPONSE_PARTICLES_OPTIONS
    default:
      return {}
  }
})

const GetCurrentRankingColor = computed(() => {
  switch (Props.currentRanking) {
    case 1:
      return 'text-latte-yellow dark:text-mocha-yellow'
    case 2:
      return 'text-latte-lavender dark:text-mocha-lavender'
    case 3:
      return 'text-latte-maroon dark:text-mocha-maroon'
    default:
      return 'text-latte-text dark:text-mocha-text'
  }
})
</script>

<!-- TODO: A lot of w-x everywhere, maybe we can avoid this? -->
<template>
  <div class="relative w-min select-none">
    <div
      class="h-52 w-32 p-1 transition-all duration-125 -skew-x-4"
      :class="{
        'bg-latte-surface1  dark:bg-mocha-surface1': UserResponse === UserResponseState.NotAnswered,
        'bg-orange-300': UserResponse === UserResponseState.WaitingResult,
        'bg-latte-green  dark:bg-mocha-green': UserResponse === UserResponseState.Correct,
        'bg-[#f90b31]  dark:bg-[#f90b31]': UserResponse === UserResponseState.Incorrect,
      }"
    >
      <SimplifiedParticles
        v-if="ShouldShowParticles"
        :options="GetParticlesOptions"
        class="absolute z-1 h-full w-full"
      />
      <NuxtImg
        src="/avatars/Avatar01.png"
        class="h-full w-full object-cover object-top"
        :class="{
          'filter grayscale': UserResponse === UserResponseState.NotAnswered,
          'filter brightness-40': UserResponse === UserResponseState.WaitingResult,
          'filter brightness-100': UserResponse === UserResponseState.Correct,
          'filter grayscale-50 brightness-50': UserResponse === UserResponseState.Incorrect,
        }"
      />
    </div>
    <!-- Current Rank (In-Game) / Username -->
    <div class="mt-1 flex items-start gap-0.5 text-xs font-sans">
      <div class="w-5 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap bg-mocha-surface1 py-0.25 -ml-2 -skew-x-4">
        <span class="skew-x-4" :class="GetCurrentRankingColor">{{ currentRanking }}</span>
      </div>
      <div class="w-26.5 bg-mocha-surface1 px-1 py-0.25 text-latte-text -skew-x-4 dark:text-mocha-text">
        <div class="skew-x-4 overflow-hidden text-ellipsis whitespace-nowrap">
          Mikyan0207
        </div>
      </div>
    </div>

    <!-- Points / Host -->
    <div class="mt-0.5 flex items-start gap-0.5 text-xs font-sans">
      <div class="flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap bg-mocha-surface1 py-0.25 -ml-2.5 -skew-x-4">
        <span class="skew-x-4 px-2 text-latte-text dark:text-mocha-text"> {{ currentRanking * 100 }}</span>
      </div>
      <div v-if="isHost" class="bg-latte-red px-2 py-0.25 text-latte-text -skew-x-4 dark:text-white">
        <div class="flex skew-x-4 items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
          Host
        </div>
      </div>
    </div>
  </div>
</template>
