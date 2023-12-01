<script setup lang="ts">
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ApiError } from '~/Core/Models/Error'
import type { ICreateRoomInfo } from '~/Core/Forms/Rooms/CreateRoomInfo'
import { useRoomsStore } from '~/Composables/Stores/RoomsStore'
import { CreateRoomRequest } from '~/Core/Requests/Rooms/CreateRoomRequest'
import { RoomType } from '~/Core/Enums/RoomType'

useHead({
  title: 'Create Room · Utapoi',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Create a new room to play with your friends',
    },
  ],
})

const Info = reactive<ICreateRoomInfo>({
  Name: '',
  Password: '',
  MaxPlayers: 4,
  Rounds: 20,
  Type: RoomType.MultiPlayer,
})

const RoomsStore = useRoomsStore()
const v = useVuelidate()
// const Router = useRouter()

/**
 * The error that occurred when creating the room.
 * Can be undefined if no error occurred.
 */
const CreateRoomError = ref<ApiError | undefined>(undefined)
const IsSubmitting = ref<boolean>(false)
const IsDisabled = computed(() => IsSubmitting.value || !v.value.$anyDirty || v.value.$invalid)

/**
 * Function called when the user submits the form
 */
async function OnSubmit() {
  if (IsDisabled.value)
    return

  CreateRoomError.value = undefined
  IsSubmitting.value = true

  const request = CreateRoomRequest.FromInfo(Info)
  const response = await RoomsStore.CreateAsync(request)

  if (response instanceof ApiError)
    CreateRoomError.value = response

  IsSubmitting.value = false

  // Router.push({ name: '/rooms/lobby' })
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-4 font-sans md:px-8 md:py-8">
    <!-- Header/Title -->
    <div class="mb-8 flex flex-col">
      <div class="text-3xl font-semibold text-latte-text dark:text-mocha-text">
        Create Room
      </div>
      <div class="text-sm text-latte-subtext0 dark:text-mocha-subtext0">
        Create a new room to play with your friends
      </div>
    </div>

    <!-- Form (Steps?) -->
    <div>
      <form
        class="w-full flex flex-col items-start justify-start gap-2"
        @submit.prevent="OnSubmit"
      >
        <!-- Name & Password -->
        <div class="w-full flex gap-2 rounded-xl bg-latte-surface0 p-5 shadow dark:bg-mocha-surface0 dark:shadow-none">
          <TextInputField
            v-model="Info.Name"
            label="Name"
            placeholder="Enter a name for your room"
            name="room-name"
            show-label
            class="w-1/2"
            :rules="{ required }"
          />
          <TextInputField
            v-model="Info.Name"
            label="Password"
            placeholder="Enter a password for your room (optional)"
            name="room-password"
            show-label
            class="w-1/2"
          />
        </div>

        <!-- Submit / Back -->
        <div class="mt-4 w-full inline-flex justify-between">
          <NuxtLink
            to="/multiplayer"
            class="h-min cursor-pointer rounded-full px-4 py-2 font-semibold uppercase text-latte-text ring-2 ring-latte-lavender transition-all duration-150 hover:bg-latte-lavender dark:text-mocha-text hover:text-latte-base hover:ring-0 dark:ring-mocha-lavender hover:dark:bg-mocha-lavender hover:dark:text-mocha-base"
          >
            Back
          </NuxtLink>
          <button
            type="submit"
            class="flex items-center gap-2 rounded-full px-4 py-2 font-semibold uppercase text-latte-base dark:text-mocha-base"
            :class="{
              'bg-latte-green/25 dark:bg-mocha-green/25 cursor-not-allowed': IsDisabled,
              'bg-latte-green dark:bg-mocha-green cursor-pointer': !IsDisabled,
            }"
          >
            <div v-if="IsSubmitting" class="spin i-fluent:spinner-ios-16-filled" />
            <span>Submit</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="css">
.spin {
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}
</style>
