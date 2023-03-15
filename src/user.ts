import type { UserDetails } from './types'

export interface CreateUserPayload {
  firstName: string
  lastName: string
  image?: string
  nickname?: string
}

export interface IUser {
  /**
   * get user details
   * @param userId
   */
  getUser(userId: string): Promise<UserDetails>

  /**
   * create an user object
   * @param data
   * @param userId
   */
  createUser(data: CreateUserPayload, userId?: string): Promise<UserDetails>

  /**
   * update an user object
   * @param data
   */
  updateUser(data: Partial<CreateUserPayload>): Promise<UserDetails>

  /**
   * update user device token, in order to receive notifications
   * @param userId
   * @param token
   */
  updateUserDeviceToken(userId: string, token: string): Promise<void>

  /**
   * register callback triggered when a user is added or updated
   * @param onUsersUpdate
   * @param onError
   */
  fetchUsers(onUsersUpdate: (users: UserDetails[]) => void, onError: (error: Error) => void): void
}
