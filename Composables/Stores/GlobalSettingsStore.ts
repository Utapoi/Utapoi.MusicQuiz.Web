export const useGlobalSettings = defineStore('GlobalSettings', () => {
  const MusicVolume = ref(15)
  const EffectsVolume = ref(50)
  const MainVolume = ref(50)

  // TODO: Store preferences in local storage or on the server.

  function GetMusicVolume(): number {
    const totalVolume = MusicVolume.value / 100 + MainVolume.value / 100

    return Math.min(1, Math.max(0, totalVolume))
  }

  function GetRawMusicVolume(): number {
    return MusicVolume.value
  }

  function GetEffectsVolume(): number {
    const totalVolume = EffectsVolume.value / 100 + MainVolume.value / 100

    return Math.min(1, Math.max(0, totalVolume))
  }

  function GetRawEffectsVolume(): number {
    return EffectsVolume.value
  }

  function GetMainVolume(): number {
    return MainVolume.value / 100
  }

  function GetRawMainVolume(): number {
    return MainVolume.value
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

  function SetMainVolume(amount: number): void {
    MainVolume.value += amount

    if (MainVolume.value > 100)
      MainVolume.value = 100

    if (MainVolume.value < 0)
      MainVolume.value = 0
  }

  return {
    GetMusicVolume,
    GetRawMusicVolume,
    GetEffectsVolume,
    GetRawEffectsVolume,
    GetMainVolume,
    GetRawMainVolume,
    SetMusicVolume,
    SetEffectsVolume,
    SetMainVolume,
  }
})
