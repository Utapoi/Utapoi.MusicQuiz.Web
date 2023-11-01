import type { ICreateRoomInfo } from '~/Core/Forms/Rooms/CreateRoomInfo'

export interface ICreateRoomRequest {
  Name: string
  Password: string | undefined
  MaxPlayers: number
  Rounds: number
}

export class CreateRoomRequest implements ICreateRoomRequest {
  Name: string
  Password: string | undefined
  MaxPlayers: number
  Rounds: number

  constructor(request: ICreateRoomRequest) {
    this.Name = request.Name
    this.Password = request.Password
    this.MaxPlayers = request.MaxPlayers
    this.Rounds = request.Rounds
  }

  public static FromInfo(info: ICreateRoomInfo): CreateRoomRequest {
    return {
      Name: info.Name,
      Password: info.Password,
      MaxPlayers: info.MaxPlayers,
      Rounds: info.Rounds,
    }
  }
}
