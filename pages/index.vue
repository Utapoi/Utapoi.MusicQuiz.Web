<script setup lang="ts">
import { UseHub } from '~/Stores/SignalR/UseHub'

const Hub = UseHub()

await Hub.ConnectAsync()

// await Hub.SendAsync('JoinRoom', {
//   roomId: '1234',
//   userId: '1234',
// })

await Hub.On<{
  roomId: string
}>('OnRoomJoined', (data) => {
  console.log(data)
})
</script>

<template>
  <h1 class="p-3 text-latte-text dark:text-mocha-text">
    Utapoi - Music Quiz
  </h1>
</template>
