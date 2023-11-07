import { ApiError } from '~/Core/Models/Error'
import { type IRoom, Room } from '~/Core/Models/Room'
import type { CreateRoomRequest } from '~/Core/Requests/Rooms/CreateRoomRequest'
import type { GetRoomsResponse } from '~/Core/Responses/Rooms/GetRoomsResponse'

export const useRoomsStore = defineStore('rooms', () => {
  const HttpClient = useHttpClient()

  const Rooms = ref<Array<Room>>([])

  async function GetAllAsync(): Promise<Array<Room>> {
    if (Rooms.value.length > 0)
      return Rooms.value

    const response = await HttpClient.Get<GetRoomsResponse>('/Rooms')

    if (response !== undefined)
      Rooms.value = response.Rooms.map((r: IRoom) => Room.FromResponse(r))

    return Rooms.value
  }

  async function SearchAsync(query: string): Promise<Array<Room>> {
    const response = await HttpClient.Get<GetRoomsResponse>(`/Rooms?query=${query}`)

    if (response !== undefined)
      Rooms.value = response.Rooms.map((r: IRoom) => Room.FromResponse(r))

    return Rooms.value
  }

  async function CreateAsync(request: CreateRoomRequest): Promise<Room | ApiError> {
    const response = await HttpClient.Post<IRoom>('/Rooms', {}, request)

    if (response instanceof ApiError)
      return response

    return Room.FromResponse(response as IRoom)
  }

  return {
    GetAllAsync,
    SearchAsync,
    CreateAsync,
  }
})
