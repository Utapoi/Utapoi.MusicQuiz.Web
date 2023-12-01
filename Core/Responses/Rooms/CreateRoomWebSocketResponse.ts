import type { RoomType } from '~/Core/Enums/RoomType'

export interface CreateRoomWebSocketResponse {
  Id: string
  Name: string
  Type: RoomType
}
