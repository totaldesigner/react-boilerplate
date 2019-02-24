import cuid from 'cuid'

export interface IUserDTO {
  id: string
  email: string
}

export interface IUser {
  constructor: {
    create(user: IUserDTO): IUser;
  }

  id: string
  email: string

  serialize(): IUserDTO
}

export default class User implements IUser {
  'constructor': typeof User

  id: string = cuid()

  constructor(public email: string) {}

  static create(dto: IUserDTO): IUser {
    const model = new User(dto.email)
    model.id = dto.id

    return model
  }

  serialize(): IUserDTO {
    return {
      id: this.id,
      email: this.email,
    }
  }
}
