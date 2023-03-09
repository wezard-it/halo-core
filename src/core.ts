import type { UserDetails } from './types'
import type { CreateUserPayload, IUser } from './user'
import { loadModule } from './utils'

export type HaloModule = 'firebase'

class HaloChat {
  private static instance: HaloChat

  private user: IUser | null = null

  private constructor() {}

  public static getInstance() {
    if (!HaloChat.instance) {
      HaloChat.instance = new HaloChat()
    }
    return HaloChat.instance
  }

  public async initialize(module: HaloModule) {
    const { User } = await loadModule(module)
    HaloChat.instance.user = new User()
  }

  public async getUser(userId: string): Promise<UserDetails | undefined> {
    return await this.user?.getUser(userId)
  }

  public async createUser(data: CreateUserPayload): Promise<UserDetails | undefined> {
    return await this.user?.createUser(data)
  }

  public async updateUser(data: Partial<CreateUserPayload>): Promise<UserDetails | undefined> {
    return await this.user?.updateUser(data)
  }

  public async updateUserDeviceToken(userId: string, token: string): Promise<void> {
    return await this.user?.updateUserDeviceToken(userId, token)
  }

  public fetchUser(onUsersUpdate: (users: UserDetails[]) => void, onError: (error: Error) => void): void {
    return this.user?.fetchUsers(onUsersUpdate, onError)
  }
}

export const halo = HaloChat.getInstance()
