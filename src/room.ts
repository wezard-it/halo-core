import type { MessageType, Room, RoomDetails } from './types'

export interface CreateTextMessagePayload {
  userId: string
  roomId: string
  text: string
  metadata?: Record<string, any>
  contentType?: MessageType.ContentType
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

export interface CreateSurveyMessagePayload {
  userId: string
  roomId: string
  survey: {
    title: string
    multiple: boolean
    options: string[]
  }
}

export interface UpdateSurveyPayload {
  userId: string
  roomId: string
  surveyId: string
  votes: string[]
}

export interface IRoom {
  /**
   * get rooms for authenticated user
   *
   * @param next
   */
  getRooms(next?: string): Promise<{ rooms: RoomDetails[]; next: string; hasNext: boolean }>

  /**
   * get room details
   * @param roomId the room id
   */
  getRoomDetails(roomId: string): Promise<RoomDetails>

  /**
   * create a room object
   *
   * @param users array of user ids to be added to the room, it does not include creator id
   * @param scope scope of the room, it must be PRIVATE or GROUP
   * @param name name of the room, if needed
   */
  createRoomWithUsers(users: string[], scope?: string, name?: string): Promise<RoomDetails>

  /**
   * create a room object with AGENT scope
   *
   * @param tag agent tag of the room
   */
  createRoomForAgents(tag: string): Promise<RoomDetails>

  /**
   * add a user to a room with scope GROUP
   *
   * @param userId id of the user to add
   * @param roomId id of the room
   */
  joinUser(userId: string, roomId: string): Promise<RoomDetails>

  /**
   * add an agent to a room with scope AGENT
   *
   * @param agentId id of the agent to add
   * @param roomId id of the room
   */
  joinAgent(agentId: string, roomId: string): Promise<RoomDetails>

  /**
   * remove a user from a room with scope GROUP
   *
   * @param userId id of the user to remove
   * @param roomId id of the room
   */
  removeUser(userId: string, roomId: string): Promise<RoomDetails>

  /**
   * send text message to a room
   *
   * @param data
   */
  sendTextMessage(data: CreateTextMessagePayload): Promise<MessageType.Any>

  /**
   * send file message to a room. it receives the path to a file and it handles file upload
   *
   * @param data
   */
  sendFileMessage(data: CreateFileMessagePayload): Promise<MessageType.Any>

  /**
   * send file message to a room. it receives the url of the file and does not handle the file upload
   *
   * @param data
   */
  sendFileMessageFromUrl(data: CreateFileMessageFromUrlPayload): Promise<MessageType.Any>

  /**
   * send survey message to a room
   *
   * @param data
   */
  sendSurveyMessage(data: CreateSurveyMessagePayload): Promise<MessageType.Any>

  /**
   * update survey
   *
   * @param data
   */
  updateSurvey(data: UpdateSurveyPayload): Promise<MessageType.Any>

  /**
   * mark a message as read
   *
   * @param userId id of the user whom read message
   * @param roomId id of the room containing the message
   * @param messageId id of the message to mark as read
   */
  readMessage(userId: string, roomId: string, messageId: string): Promise<void>

  /**
   * delete a message
   *
   * @param userId id of the user whom deleted message
   * @param roomId id of the room containing the message
   * @param messageId id of the message to delete
   */
  deleteMessage(userId: string, roomId: string, messageId: string): Promise<void>

  /**
   * retrieve medias of a room filtered by media content type
   *
   * @param roomId id of the room you want to get media
   * @param contentType array of content types to filter media
   */
  getRoomMedia(roomId: string, contentType: MessageType.ContentType[]): Promise<MessageType.MediaInfo[]>

  /**
   * register a callback triggered when a room is added or updated
   *
   * @param onRoomsUpdate
   * @param onError
   */
  fetchRooms(onRoomsUpdate: (rooms: Room[]) => void, onError: (error: Error) => void): void

  /**
   * register a callback triggered when an AGENT room is added or updated
   *
   * @param tags array of tags to filter rooms
   * @param onRoomsUpdate
   * @param onError
   */
  fetchRoomsByAgent(tags: string[], onRoomsUpdate: (rooms: Room[]) => void, onError: (error: Error) => void): void

  /**
   * register a callback triggered when a message is added or updated in a room
   *
   * @param roomId
   * @param onMessagesUpdate
   * @param onError
   */
  fetchMessages(
    roomId: string,
    onMessagesUpdate: (messages: MessageType.Any[]) => void,
    onError: (error: Error) => void,
  ): void
}
