export type User = {
  id: string
  firstName: string | null
  lastName: string | null
  image: string | null
  nickname: string | null
  createdAt: string
  deviceToken: string | null
  metadata: Record<string, any> | null
}

export type UserDetails = Omit<User, 'createdAt' | 'deviceToken'>

export type Agent = {
  id: string
  firstName: string
  lastName: string
  image: string | null
  createdAt: string
  tags: string[]
  deviceToken: string | null
  metadata: Record<string, any> | null
}

export type AgentDetails = Omit<Agent, 'createdAt' | 'deviceToken' | 'tags'>

export type RoomScope = 'PRIVATE' | 'GROUP' | 'AGENT'

export type Room = {
  id: string
  createdBy: string
  createdAt: string
  usersIds: string[]
  removedUsersIds: string[]
  scope: RoomScope
  tag: string | null
  name: string | null
  agentsIds: string[] | null
  lastMessage: {
    id: string
    text: string | null
    type: MessageType.ContentType
    sentBy: string
    sentAt: string
  } | null
  metadata: Record<string, any> | null
}

export type RoomDetails = Room & {
  users: UserDetails[]
  agents: AgentDetails[] | null
}

export namespace MessageType {
  export type Any = Text | File | Custom
  export type ContentType = 'TEXT' | 'IMAGE' | 'AUDIO' | 'VIDEO' | 'CUSTOM'

  export type Media = {
    uri: string
    mimeType: string | null
    name: string
  }

  export type MediaInfo = {
    messageId: string
    createdBy: string
    file: Media
  }

  type Base = {
    id: string
    contentType: ContentType
    createdBy: string
    room: string
    text: string | null
    metadata: Record<string, any> | null
    delivered: boolean
    deleted: boolean
    readBy: string[]
    createdAt: string
    updatedAt: string
  }

  export type Text = Base & {
    text: string
    contentType: 'TEXT'
  }

  export type File = Base & {
    contentType: 'IMAGE' | 'AUDIO' | 'VIDEO' | 'CUSTOM'
    file: Media
  }

  export type Custom = Base & {
    contentType: 'CUSTOM'
    uri: string | null
    metadata: Record<string, any>
  }
}
