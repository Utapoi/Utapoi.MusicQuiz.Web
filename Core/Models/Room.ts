import type { IUser } from './User'

export interface IRoom {
  Id: string
  Users: IUser[]
}

export class Room {
  public Id: string
  public Users: IUser[]

  constructor(data: IRoom) {
    this.Id = data.Id
    this.Users = data.Users
  }

  public static FromResponse(data: IRoom): Room {
    return new Room(data)
  }
}
