import type { MessageType, Room, RoomDetails } from './types'

export interface CreateTextMessagePayload {
  userId: string
  roomId: string
  text: string
  metadata?: Record<string, any>
}

export interface CreateFileMessagePayload {
  userId: string
  roomId: string
  text: string
  file: {
    filename: string
    uri: string
    mimeType: string
  }
  metadata?: Record<string, any>
}

export interface CreateFileMessageFromUrlPayload {
  userId: string
  roomId: string
  text: string
  file: {
    filename: string
    url: string
    mimeType: string
  }
  metadata?: Record<string, any>
}

export interface IRoom {
  getRooms(next?: string): Promise<{ rooms: RoomDetails[]; next: string }>
  getRoomDetails(roomId: string): Promise<RoomDetails>
  createRoomWithUsers(users: string[], scope?: string, name?: string): Promise<RoomDetails>
  createRoomForAgents(tag: string): Promise<RoomDetails>
  joinUser(userId: string, roomId: string): Promise<RoomDetails>
  joinAgent(agentId: string, roomId: string): Promise<RoomDetails>
  removeUser(userId: string, roomId: string): Promise<RoomDetails>
  sendTextMessage(data: CreateTextMessagePayload): Promise<MessageType.Any>
  sendFileMessage(data: CreateFileMessagePayload): Promise<MessageType.Any>
  sendFileMessageFromUrl(data: CreateFileMessageFromUrlPayload): Promise<MessageType.Any>
  readMessage(userId: string, roomId: string, messageId: string): Promise<void>
  deleteMessage(userId: string, roomId: string, messageId: string): Promise<void>
  getRoomMedia(roomId: string, contentType: MessageType.ContentType[]): Promise<MessageType.MediaInfo[]>

  fetchRooms(onRoomsUpdate: (rooms: Room[]) => void, onError: (error: Error) => void): void
  fetchRoomsByAgent(tags: string[], onRoomsUpdate: (rooms: Room[]) => void, onError: (error: Error) => void): void
  fetchMessages(
    roomId: string,
    onMessagesUpdate: (messages: MessageType.Any[]) => void,
    onError: (error: Error) => void,
  ): void
}
