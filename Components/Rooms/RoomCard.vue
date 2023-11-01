<script setup lang="ts">
import type { Room } from '~/Core/Models/Room'

export interface IRoomCardProps {
  room: Room
}

defineProps<IRoomCardProps>()
</script>

<template>
  <div class="border-rounded-xl bg-latte-surface0 p-2 dark:bg-mocha-surface0">
    <p class="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap">
      {{ room.Name }}
    </p>
  </div>
</template>
