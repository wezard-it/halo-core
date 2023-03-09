import type { CreateAgentPayload, IAgent } from './agent'
import type { CreateFileMessageFromUrlPayload, CreateFileMessagePayload, CreateTextMessagePayload, IRoom } from './room'
import type { AgentDetails, MessageType, Room, RoomDetails, UserDetails } from './types'
import type { CreateUserPayload, IUser } from './user'
import { loadModule } from './utils'

export type HaloModule = 'firebase'

class HaloChat {
  private static instance: HaloChat

  private user: IUser | null = null
  private agent: IAgent | null = null
  private room: IRoom | null = null

  private constructor() {}

  public static getInstance() {
    if (!HaloChat.instance) {
      HaloChat.instance = new HaloChat()
    }
    return HaloChat.instance
  }

  public async initialize(module: HaloModule) {
    const { User, Agent, Room } = await loadModule(module)
    HaloChat.instance.user = new User()
    HaloChat.instance.agent = new Agent()
    HaloChat.instance.room = new Room()
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

  public fetchUsers(onUsersUpdate: (users: UserDetails[]) => void, onError: (error: Error) => void): void {
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

  // ROOM

  public async createRoomWithUsers(users: string[], name?: string): Promise<RoomDetails> {
    return await HaloChat.instance.room!.createRoomWithUsers(users, name)
  }

  public async createRoomForAgents(tag: string): Promise<RoomDetails> {
    return await HaloChat.instance.room!.createRoomForAgents(tag)
  }

  public async joinUser(userId: string, roomId: string): Promise<RoomDetails> {
    return await HaloChat.instance.room!.joinUser(userId, roomId)
  }

  public async joinAgent(agentId: string, roomId: string): Promise<RoomDetails> {
    return await HaloChat.instance.room!.joinAgent(agentId, roomId)
  }

  public async removeUser(userId: string, roomId: string): Promise<RoomDetails> {
    return await HaloChat.instance.room!.removeUser(userId, roomId)
  }

  public async sendTextMessage(data: CreateTextMessagePayload): Promise<MessageType.Any> {
    return await HaloChat.instance.room!.sendTextMessage(data)
  }

  public async sendFileMessage(data: CreateFileMessagePayload): Promise<MessageType.Any> {
    return await HaloChat.instance.room!.sendFileMessage(data)
  }

  public async sendFileMessageFromUrl(data: CreateFileMessageFromUrlPayload): Promise<MessageType.Any> {
    return await HaloChat.instance.room!.sendFileMessageFromUrl(data)
  }

  public fetchRooms(onRoomsUpdate: (rooms: RoomDetails[]) => void, onError: (error: Error) => void): void {
    return HaloChat.instance.room!.fetchRooms(onRoomsUpdate, onError)
  }

  public fetchRoomsByAgent(
    agentId: string,
    onRoomsUpdate: (rooms: Room[]) => void,
    onError: (error: Error) => void,
  ): void {
    return HaloChat.instance.room!.fetchRoomsByAgent(agentId, onRoomsUpdate, onError)
  }

  public fetchMessages(
    roomId: string,
    onMessagesUpdate: (messages: MessageType.Any[]) => void,
    onError: (error: Error) => void,
  ): void {
    return HaloChat.instance.room!.fetchMessages(roomId, onMessagesUpdate, onError)
  }
}

export const halo = HaloChat.getInstance()
