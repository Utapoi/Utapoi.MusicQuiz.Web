<script setup lang="ts">
import { loadFull } from 'tsparticles'
import { nanoid } from 'nanoid'

export interface ISimplifiedParticlesProps {
  options: any
}

defineProps<ISimplifiedParticlesProps>()
</script>

<template>
  <Particles
    :id="nanoid()"
    :particles-init="loadFull"
    :options="options"
    v-bind="$attrs"
  />
</template>
