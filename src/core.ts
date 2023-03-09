import type { CreateAgentPayload, IAgent } from './agent'
import type { AgentDetails, UserDetails } from './types'
import type { CreateUserPayload, IUser } from './user'
import { loadModule } from './utils'

export type HaloModule = 'firebase'

class HaloChat {
  private static instance: HaloChat

  private user: IUser | null = null
  private agent: IAgent | null = null

  private constructor() {}

  public static getInstance() {
    if (!HaloChat.instance) {
      HaloChat.instance = new HaloChat()
    }
    return HaloChat.instance
  }

  public async initialize(module: HaloModule) {
    const { User, Agent } = await loadModule(module)
    HaloChat.instance.user = new User()
    HaloChat.instance.agent = new Agent()
  }

  // USER

  public async getUser(userId: string): Promise<UserDetails> {
    return await HaloChat.instance.user!.getUser(userId)
  }

  public async createUser(data: CreateUserPayload): Promise<UserDetails> {
    return await HaloChat.instance.user!.createUser(data)
  }

  public async updateUser(data: Partial<CreateUserPayload>): Promise<UserDetails> {
    return await HaloChat.instance.user!.updateUser(data)
  }

  public async updateUserDeviceToken(userId: string, token: string): Promise<void> {
    return await HaloChat.instance.user!.updateUserDeviceToken(userId, token)
  }

  public fetchUser(onUsersUpdate: (users: UserDetails[]) => void, onError: (error: Error) => void): void {
    return HaloChat.instance.user!.fetchUsers(onUsersUpdate, onError)
  }

  // AGENT

  public async getAgent(agentId: string): Promise<AgentDetails> {
    return await HaloChat.instance.agent!.getAgent(agentId)
  }

  public async createAgent(data: CreateAgentPayload): Promise<AgentDetails> {
    return await HaloChat.instance.agent!.createAgent(data)
  }

  public async updateAgent(data: Partial<CreateAgentPayload>): Promise<AgentDetails> {
    return await HaloChat.instance.agent!.updateAgent(data)
  }

  public async updateAgentDeviceToken(agentId: string, token: string): Promise<void> {
    return await HaloChat.instance.agent!.updateAgentDeviceToken(agentId, token)
  }
}

export const halo = HaloChat.getInstance()
