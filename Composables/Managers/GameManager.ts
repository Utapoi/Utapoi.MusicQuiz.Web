import { Room } from '~/Core/Models/Room'

export const useGameManager = defineStore('GameManager', () => {
  const CurrentRoom = ref<Room>(new Room())

  function SetCurrentRoom(room: Room) {
    CurrentRoom.value = room
  }

  return {
    CurrentRoom,
    SetCurrentRoom,
  }
})
