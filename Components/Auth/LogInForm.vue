<script setup lang="ts">
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import type { ILogInRequest } from '~/Core/Requests/Auth/LogInRequest'
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'

const IdentityStore = useIdentityStore()
const v = useVuelidate()

const Info = reactive<ILogInRequest>({
  Username: '',
  Password: '',
})

const IsSubmitting = ref<boolean>(false)
const IsDisabled = computed(() => IsSubmitting.value || !v.value.$anyDirty || v.value.$invalid)
</script>

<template>
  <form class="flex flex-col p-2">
    <TextInputField
      v-model="Info.Username"
      label="Username"
      placeholder="Username"
      name="room-name"
      :show-label="false"
      :show-error-message="false"
      class="w-full"
      :rules="{ required }"
    />
    <TextInputField
      v-model="Info.Password"
      label="Password"
      placeholder="Password"
      name="room-name"
      :show-label="false"
      :show-error-message="false"
      class="w-full"
      type="password"
      :rules="{ required }"
    />
    <button
      type="submit"
      class="mx-auto w-1/2 gap-2 rounded-full px-4 py-2 text-center font-semibold uppercase text-latte-base dark:text-mocha-base"
      :class="{
        'bg-latte-green/25 dark:bg-mocha-green/25 cursor-not-allowed': IsDisabled,
        'bg-latte-green dark:bg-mocha-green hover:bg-latte-green/75 hover:dark:bg-mocha-green/75 cursor-pointer': !IsDisabled,
      }"
      @click.prevent="IdentityStore.LogInAsync(Info.Username, Info.Password)"
    >
      Log In
    </button>
  </form>
</template>
