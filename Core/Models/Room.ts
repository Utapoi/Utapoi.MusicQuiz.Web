import { RoomType } from '../Enums/RoomType'
import type { IUser } from './User'

export interface IRoom {
  Id: string
  Name: string
  Type: RoomType
  Users: IUser[]
}

export class Room implements IRoom {
  public Id: string
  public Name: string
  public Type: RoomType
  public Users: IUser[]

  constructor() {
    this.Id = ''
    this.Name = ''
    this.Type = RoomType.SinglePlayer
    this.Users = []
  }

  public static FromResponse(data: IRoom): Room {
    const room = new Room()

    room.Id = data.Id
    room.Name = data.Name
    room.Type = data.Type
    room.Users = data.Users

    return room
  }
}
