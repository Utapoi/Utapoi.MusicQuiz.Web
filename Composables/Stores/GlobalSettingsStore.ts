export const useGlobalSettings = defineStore('GlobalSettings', () => {
  const MusicVolume = ref(0.15)
  const EffectsVolume = ref(0.5)

  // TODO: Store preferences in local storage or on the server.

  function GetMusicVolume(): number {
    return MusicVolume.value
  }

  function GetEffectsVolume(): number {
    return EffectsVolume.value
  }

  return {
    GetMusicVolume,
    GetEffectsVolume,
  }
})
