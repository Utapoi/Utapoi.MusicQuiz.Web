import type { RoomType } from '~/Core/Enums/RoomType'

export interface ICreateRoomInfo {
  Name: string
  Password: string | undefined
  MaxPlayers: number
  Rounds: number
  Type: RoomType
}
