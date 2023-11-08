<script setup lang="ts">
import { useRoomsStore } from '~/Composables/Stores/RoomsStore'
import type { Room } from '~/Core/Models/Room'

useHead({
  title: 'Rooms · Utapoi',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Play with your friends',
    },
  ],
})

interface ISearchFilters {
  query?: string
  sorting?: string
}

// Composables
const RoomsStore = useRoomsStore()

// Refs
const Rooms = ref<Room[]>([])
const IsSearching = ref<boolean>(false)
const SearchFilters = ref<ISearchFilters>({
  query: '',
})

const HasSearchFilters = computed<boolean>(() => {
  return (SearchFilters.value.query !== undefined
    && SearchFilters.value.query !== '')
    || SearchFilters.value.sorting !== undefined
})

// Initialization
// Rooms.value = await RoomsStore.GetAllAsync()

// Debounced Methods
const SearchAsyncDebounced = useDebounceFn(async () => {
  try {
    IsSearching.value = true

    if (SearchFilters.value.query === undefined || SearchFilters.value.query === '') {
      Rooms.value = await RoomsStore.GetAllAsync()
      return
    }

    Rooms.value = await RoomsStore.SearchAsync(SearchFilters.value.query)
  }
  finally {
    IsSearching.value = false
  }
}, 500, {
  maxWait: 2500,
})

// Methods
async function OnSearchQueryChanged() {
  await SearchAsyncDebounced()
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-4 font-sans md:px-8 md:py-8">
    <div class="flex flex-col">
      <div class="text-3xl font-semibold text-latte-text dark:text-mocha-text">
        Rooms
      </div>
      <div class="text-sm text-latte-subtext0 dark:text-mocha-subtext0">
        Browse all the rooms
      </div>
    </div>

    <!-- Search -->
    <div class="mb-8 mt-12 w-full flex gap-2 text-latte-text dark:text-mocha-text">
      <div class="w-full flex items-center justify-start gap-2">
        <div class="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap rounded-full bg-latte-surface1 px-3 py-1 shadow md:w-66 dark:bg-mocha-surface1 hover:bg-latte-surface2 hover:dark:bg-mocha-surface2">
          <span class="i-fluent:search-16-filled text-lg" />
          <input
            v-model="SearchFilters.query"
            class="w-full bg-transparent outline-none"
            placeholder="Search..."
            type="text"
            @input="OnSearchQueryChanged"
          >
        </div>
        <div v-if="HasSearchFilters" class="flex cursor-pointer items-center gap-1 rounded-full bg-latte-surface1 px-3 py-1 text-latte-text dark:bg-mocha-surface1 dark:text-mocha-text">
          <span>Name</span>
          <span class="i-fluent:arrow-down-16-filled text-sm" />
        </div>
        <NuxtLink to="/multiplayer/create" class="ml-4 flex cursor-pointer items-center gap-1 rounded-full bg-latte-red px-3 py-1 text-latte-base dark:bg-mocha-red dark:text-mocha-base">
          <span>Create</span>
          <span class="i-fluent:add-16-filled text-sm" />
        </NuxtLink>
      </div>
    </div>

    <!-- Rooms -->
    <div v-if="!HasSearchFilters" class="text-latte-text dark:text-mocha-text">
      <!-- TODO: Friends -->
      <!-- <div>
        <div class="flex items-center justify-between">
          <h2 class="mb-2 text-lg font-semibold font-sans uppercase text-latte-overlay0 dark:text-mocha-overlay0">
            Friends
          </h2>
        </div>
        <div class="grid grid-cols-3 max-w-10xl max-w-10xl w-full w-full gap-4 3xl:grid-cols-9 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-7">
          <RoomCard v-for="room in Rooms" :key="room.Id" :room="room" />
        </div>
      </div> -->

      <!-- All -->
      <div class="mt-16">
        <div class="flex items-center justify-between">
          <h2 class="mb-2 text-lg font-semibold font-sans uppercase text-latte-overlay0 dark:text-mocha-overlay0">
            All
          </h2>
        </div>
        <div class="grid grid-cols-3 max-w-10xl max-w-10xl w-full w-full gap-4 3xl:grid-cols-9 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-7">
          <RoomCard v-for="room in Rooms" :key="room.Id" :room="room" />
        </div>
      </div>
    </div>

    <!-- Search Results -->
    <div v-else-if="HasSearchFilters && !IsSearching">
      <h2 class="mb-1 text-lg font-semibold font-serif uppercase text-latte-overlay0 dark:text-mocha-overlay0">
        Search Results
      </h2>
      <p class="mb-6 font-semibold text-latte-overlay0 dark:text-mocha-overlay0">
        for <span class="ml-1 rounded-full bg-latte-sky px-2 py-0.5 text-sm font-semibold text-latte-base dark:bg-mocha-sky dark:text-mocha-base">{{ SearchFilters.query }}</span>
      </p>
      <div class="grid grid-cols-3 max-w-10xl max-w-10xl w-full w-full gap-4 text-latte-text 3xl:grid-cols-9 lg:grid-cols-5 md:grid-cols-4 xl:grid-cols-7 dark:text-mocha-text">
        <RoomCard v-for="room in Rooms" :key="room.Id" :room="room" />
      </div>
    </div>
  </div>
</template>
