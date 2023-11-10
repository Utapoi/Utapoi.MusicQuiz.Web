import { GameMode } from '~/Core/Enums/GameMode'
import type { IGameSettings } from '~/Core/Models/GameSettings'

export const useGameSettingsStore = defineStore('GameSettings', () => {
  const GameSettings = reactive<IGameSettings>({
    // Note(Mikyan): We don't need a default value, but at least we don't have to work with nullable values.
    Mode: GameMode.SongsWithSingers,
  })

  function GetGameMode() {
    return GameSettings.Mode
  }

  function SetGameMode(mode: GameMode) {
    GameSettings.Mode = mode
  }

  function IsGameMode(mode: GameMode) {
    return GameSettings.Mode === mode
  }

  return {
    GetGameMode,
    SetGameMode,
    IsGameMode,
  }
})
