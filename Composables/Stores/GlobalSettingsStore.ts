export const useGlobalSettings = defineStore('GlobalSettings', () => {
  const MusicVolume = ref(15)
  const EffectsVolume = ref(50)

  // TODO: Store preferences in local storage or on the server.

  function GetMusicVolume(): number {
    return MusicVolume.value / 100
  }

  function GetRawMusicVolume(): number {
    return MusicVolume.value
  }

  function GetEffectsVolume(): number {
    return EffectsVolume.value / 100
  }

  function GetRawEffectsVolume(): number {
    return EffectsVolume.value
  }

  function SetMusicVolume(amount: number): void {
    MusicVolume.value += amount

    if (MusicVolume.value > 100)
      MusicVolume.value = 100

    if (MusicVolume.value < 0)
      MusicVolume.value = 0
  }

  function SetEffectsVolume(amount: number): void {
    EffectsVolume.value += amount

    if (EffectsVolume.value > 100)
      EffectsVolume.value = 100

    if (EffectsVolume.value < 0)
      EffectsVolume.value = 0
  }

  return {
    GetMusicVolume,
    GetRawMusicVolume,
    GetEffectsVolume,
    GetRawEffectsVolume,
    SetMusicVolume,
    SetEffectsVolume,
  }
})
