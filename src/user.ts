import type { UserDetails } from './types'

export interface CreateUserPayload {
  firstName: string
  lastName: string
  image?: string
  nickname?: string
}

export interface IUser {
  getUser(userId: string): Promise<UserDetails>
  createUser(data: CreateUserPayload): Promise<UserDetails>
  updateUser(data: Partial<CreateUserPayload>): Promise<UserDetails>
  updateUserDeviceToken(userId: string, token: string): Promise<void>
  fetchUsers(onUsersUpdate: (users: UserDetails[]) => void, onError: (error: Error) => void): void
}
