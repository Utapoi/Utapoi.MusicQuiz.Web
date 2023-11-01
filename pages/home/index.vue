<script setup lang="ts">
import { UseHub } from '~/Composables/Stores/UseHub'

const Hub = UseHub()

await Hub.ConnectAsync()

// await Hub.SendAsync('JoinRoom', {
//   roomId: '1234',
//   userId: '1234',
// })
// await Hub.On<{
//   RoomId: string
// }>('OnRoomJoined', (data) => {
//   console.log(data)
// })
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center text-latte-text dark:text-mocha-text">
    <div class="flex flex-col items-center gap-2">
      <NuxtLink to="/rooms/create">
        Create Room
      </NuxtLink>
      <NuxtLink to="/rooms">
        Join Room
      </NuxtLink>
    </div>
  </div>
</template>
