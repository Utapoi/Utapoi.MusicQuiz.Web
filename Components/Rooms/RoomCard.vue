<script setup lang="ts">
import { useGameManager } from '~/Composables/Managers/GameManager'
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'
import type { Room } from '~/Core/Models/Room'

export interface IRoomCardProps {
  room: Room
}

const Props = defineProps<IRoomCardProps>()

const Router = useRouter()
const GameManager = useGameManager()
const IdentityStore = useIdentityStore()
const { $HubConnection } = useNuxtApp()

async function SpectateRoom() {
  // TODO: Implement spectate room.
}

async function JoinRoom() {
  await $HubConnection.SendAsync('JoinRoom', {
    roomId: Props.room.Id,
    userId: IdentityStore.GetUserId(),
    // TODO: Add a popup to ask for a password if required.
  })

  $HubConnection.On<{ Room: Room }>('OnRoomJoined', (data) => {
    GameManager.CurrentRoom = data.Room
    Router.push('/game')
  })
}
</script>

<template>
  <div class="border-rounded-xl bg-latte-surface0 p-1 dark:bg-mocha-surface0">
    <p class="overflow-hidden text-ellipsis whitespace-nowrap p-2 text-nowrap">
      {{ room.Name }}
    </p>
    <div class="w-full flex gap-1">
      <button
        class="w-full border-rounded-xl bg-latte-surface1 px-2 py-1 text-latte-text dark:bg-mocha-surface1 dark:text-mocha-text"
        @click.prevent="SpectateRoom"
      >
        Spectate
      </button>
      <button
        class="w-full border-rounded-xl bg-latte-red px-2 py-1 text-latte-base dark:bg-mocha-red dark:text-mocha-base"
        @click.prevent="JoinRoom"
      >
        Join
      </button>
    </div>
  </div>
</template>
