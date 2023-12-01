<script setup lang="ts">
import { useGameManager } from '~/Composables/Managers/GameManager'
import { useGameSettingsStore } from '~/Composables/Stores/GameSettingsStore'
import { useIdentityStore } from '~/Composables/Stores/IdentityStore'
import { GameMode } from '~/Core/Enums/GameMode'
import { RoomType } from '~/Core/Enums/RoomType'
import type { IRoom } from '~/Core/Models/Room'

useHead({
  title: 'Game Mode Selection | Utapoi',
})

const Router = useRouter()
const GameSettingsStore = useGameSettingsStore()
const IdentityStore = useIdentityStore()
const GameManager = useGameManager()
const { $HubConnection } = useNuxtApp()

$HubConnection.On<IRoom>('OnRoomCreated', (data) => {
  GameManager.CurrentRoom = data
})

$HubConnection.SendAsync('CreateRoom', {
  name: `${IdentityStore.GetUsername()}'s Room`,
  userId: IdentityStore.GetUserId(),
  type: RoomType.SinglePlayer,
})

async function StartGame() {
  await $HubConnection.SendAsync('StartGame', {
    roomId: GameManager.CurrentRoom.Id,
  })

  Router.push('/game')
}
</script>

<!-- ? Note(Mikyan): Something is missing here. Not really satisfied with the current design. -->
<!-- ! Let's move on for now... -->
<!-- * 10/11/2023: I can't stop until I'm satisfied... help. -->
<!-- * Plutôt satisfait avec la forme des cards. Il manque encore à retravailler le titre et probablement supprimer les particles pour ces cards là. -->
<!-- * Le background aussi doit changer, revoir le blur et ajouter un background avec opacité pour rendre les cards plus visible ? -->
<!-- * Il faut aussi ajouter un carousel horizontal pour gérer les différentes tailles d'écran et les potentiels futurs modes. -->
<!-- 25/11/2023: Est-ce que le carousel est vraiment une bonne idée? Niveau responsive c'est 0/20... -->
<template>
  <div class="h-full w-full flex items-center justify-center bg-[url(/images/HomeScreen_Wallpaper.png)] bg-cover text-latte-text dark:text-mocha-text">
    <div class="h-full w-full backdrop-blur-xl">
      <div class="h-full w-full flex items-center justify-center">
        <Swiper
          :centered-slides="true"
          :centered-slides-bounds="true"
          class="h-min w-full pt-10"
        >
          <SwiperSlide class="h-min w-min">
            <!-- Mode #1: Songs + Singers -->
            <GameModeSelectionCard
              title="Songs & Singers"
              subtitle="The default mode provides you with randomly selected songs either from a collection of your choosing or from various collections."
              class="h-96 w-96"
              @on-click="() => {
                GameSettingsStore.SetGameMode(GameMode.SongsWithSingers)
                return Router.push('/game/selection')
              }"
            />
          </SwiperSlide>

          <SwiperSlide>
            <!-- Mode #2: Singers Only -->
            <GameModeSelectionCard
              title="Singers"
              subtitle="Play with random songs either from a collection you've selected or from various collections, and you only have to guess the singer."
              class="h-96 w-96"
              @on-click="() => {
                GameSettingsStore.SetGameMode(GameMode.SingersOnly)
                return Router.push('/game/selection')
              }"
            />
          </SwiperSlide>

          <SwiperSlide>
            <!-- Mode #3: Songs -->
            <GameModeSelectionCard
              title="Songs"
              subtitle="Play with random songs either from a collection you've selected or from various collections, and you only have to guess the title of the song."
              class="h-96 w-96"
              @on-click="() => {
                GameSettingsStore.SetGameMode(GameMode.SongsOnly)
                return Router.push('/game/selection')
              }"
            />
          </SwiperSlide>

          <SwiperSlide>
            <!-- Mode #4: Anime Songs -->
            <GameModeSelectionCard
              title="Anime Songs"
              subtitle="Play with random songs either from a collection you've selected or from various anime, and you have to guess the title of the anime."
              class="h-96 w-96"
              @on-click="() => {
                GameSettingsStore.SetGameMode(GameMode.AnimeSongs)
                return Router.push('/game/selection')
              }"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 left-0 h-14 w-full flex items-center justify-between bg-black/75 font-sans lowercase">
    <BackButton />
    <button
      class="rounded-full bg-latte-surface1 px-4 py-2 text-2xl font-bold text-latte-text dark:bg-mocha-surface1 dark:text-mocha-text"
      @click.prevent="StartGame"
    >
      Start
    </button>
  </div>
</template>
