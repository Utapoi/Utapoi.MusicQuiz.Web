import { Howl } from 'howler'
import { useGlobalSettings } from '../Stores/GlobalSettingsStore'

interface ISound {
  name: string
  path: string
  instance: Howl
}

interface IMusic {
  name: string
  path: string
  instance: Howl
}

export const useAudioManager = defineStore('AudioManager', () => {
  const GlobalSettings = useGlobalSettings()
  const Sounds: Array<ISound> = [
    // ===== Hover 01 =====
    {
      name: 'Hover_01',
      path: '/sfx/Button_Hover.ogg',
      instance: new Howl({
        src: '/sfx/Button_Hover.ogg',
        volume: GlobalSettings.GetEffectsVolume(),
      }),
    },
    // ===== Click 01 =====
    {
      name: 'Click_01',
      path: '/sfx/Button_Click.ogg',
      instance: new Howl({
        src: '/sfx/Button_Click.ogg',
        volume: GlobalSettings.GetEffectsVolume(),
      }),
    },
    // ===== Scroll 01 =====
    {
      name: 'Scroll_01',
      path: '/sfx/Mouse_Scroll.wav',
      instance: new Howl({
        src: '/sfx/Mouse_Scroll.wav',
        volume: GlobalSettings.GetEffectsVolume(),
      }),
    },
    // ===== Panel Open 01 =====
    {
      name: 'Panel_Open_01',
      path: '/sfx/Panel_Open.wav',
      instance: new Howl({
        src: '/sfx/Panel_Open.wav',
        volume: GlobalSettings.GetEffectsVolume(),
      }),
    },
  ]
  const Musics = ref<IMusic[]>([])

  function PlaySound(name: string, force = false) {
    const sound = Sounds.find(x => x.name === name)
    if (!sound)
      return

    if (sound.instance.playing() && !force)
      return // Should we stop it and play it again?

    sound.instance.volume(GlobalSettings.GetEffectsVolume())
    sound.instance.play()
  }

  function PlayMusic(path: string) {
    const music = new Howl({
      src: path,
      volume: GlobalSettings.GetMusicVolume(),
    })

    Musics.value.push({
      name: path,
      path,
      instance: music,
    })

    music.play()
  }

  function StopMusic(path: string) {
    const music = Musics.value.find(x => x.name === path)
    if (!music)
      return

    music.instance.stop()
    Musics.value = Musics.value.filter(x => x.name !== path)
  }

  return {
    PlaySound,
    PlayMusic,
    StopMusic,
  }
})
