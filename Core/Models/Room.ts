import type { IUser } from './User'

export interface IRoom {
  Id: string
  Name: string
  Users: IUser[]
}

export class Room implements IRoom {
  public Id: string
  public Name: string
  public Users: IUser[]

  constructor(data: IRoom) {
    this.Id = data.Id
    this.Name = data.Name
    this.Users = data.Users
  }

  public static FromResponse(data: IRoom): Room {
    return new Room(data)
  }
}
