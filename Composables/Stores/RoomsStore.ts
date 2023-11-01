import { Room } from '~/Core/Models/Room'
import type { GetRoomsResponse } from '~/Core/Responses/Rooms/GetRoomsResponse'

export const useRoomsStore = defineStore('rooms', () => {
  const HttpClient = useHttpClient()

  const Rooms = ref<Array<Room>>([])

  async function GetAllAsync(): Promise<Array<Room>> {
    if (Rooms.value.length > 0)
      return Rooms.value

    const response = await HttpClient.Get<GetRoomsResponse>('/rooms')

    if (response !== undefined)
      Rooms.value = response.Rooms.map(r => Room.FromResponse(r))

    return Rooms.value
  }

  async function SearchAsync(query: string): Promise<Array<Room>> {
    const response = await HttpClient.Get<GetRoomsResponse>(`/rooms?query=${query}`)

    if (response !== undefined)
      Rooms.value = response.Rooms.map(r => Room.FromResponse(r))

    return Rooms.value
  }

  return {
    GetAllAsync,
    SearchAsync,
  }
})
