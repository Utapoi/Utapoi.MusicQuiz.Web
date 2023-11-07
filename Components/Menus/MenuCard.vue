<script setup lang="ts">
export interface IMenuCardProps {
  title: string
  image: string
}

const Props = defineProps<IMenuCardProps>()

const ImageBg = computed(() => {
  return `url(${Props.image})`
})
</script>

<template>
  <div class="custom-grid-item transform-gpu bg-white p-1.5 transition-all duration-100 !hover:scale-105 !hover:-rotate-45">
    <div class="rhombus menu-card-bg h-full w-full bg-cover">
      <div class="h-full w-full bg-black/75">
        <div class="absolute inset-0 h-full w-full flex items-center justify-center text-2xl font-semibold uppercase text-white">
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-grid-item {
  width: 141%; /* sqrt(2)*100% */
  aspect-ratio: 1;
  object-fit: cover;
  transform: scale(var(--_t,1)) rotate(-45deg);
  clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
  cursor: pointer;
  transition: .2s linear;
}

.rhombus {
  clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%);
}

.menu-card-bg {
  background-image: v-bind(ImageBg)
}
</style>
