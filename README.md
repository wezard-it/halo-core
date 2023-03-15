# Halo Core

<div align="center">

[![javascript][standard-wezard-badge]][standard-wezard]
[![NPM version][npmjs-badge]][npmjs-com]

</div>

## Table of Content
1. [Installation](#installation)
    1. [Firebase](#firebase)
2. [Usage](#usage)
    1. [Initialization](#initialization)
    2. [Authentication and user creation](#authentication-and-user-creation)
3. [Overview](#overview)
    1. [User](#user)
    2. [Agent](#agent)
    3. [Room](#room)
4. [Create an Halo Module](#create-an-halo-module)
## Installation

### Firebase

Add Halo dependencies:
```
yarn add @wezard/halo-core @wezard/react-native-halo-firebase
```

Add Firebase dependencies:
```
yarn add @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage
```

Setup Firebase following [official guide](https://rnfirebase.io/).

## Usage

### Initialization


```typescript
import { halo } from '@wezard/halo-core'

// ...

const initChat = () => {
    halo.initialize('firebase')
}
```

### Authentication and user creation

Halo Firebase needs to authenticate the user before they perform any action.

```typescript
import { halo } from '@wezard/halo-core'
import auth from '@react-native-firebase/app'

// ...
const signUp = async () => {
    try {
        await auth().createUserWithEmailAndPassword(email, password)
        const user = await halo.createUser({
            firstName: 'Matteo',
            lastName: 'Bianchi',
            nickname: 'mattyb98',
            image: 'https://avatar.com'
        })
        // save user data
    } catch (error) {
        // handle error
    }
}

const signIn = async () => {
    try {
        const userCredentials = await auth().signInWithEmailAndPassword(email, password)
        const user = await halo.getUser(userCredentials.user.uid)
        // save user data
    } catch (error) {
        // handle error
    }
}

```


## Overview

### User 

method | return | description
---|---|---
`getUser` | UserDetails | get user info by user id
`createUser` | UserDetails | create chat user reference
`updateUser` | UserDetails | update chat user
`updateUserDeviceToken` | void | update device token in order to receive notifications
`fetchUsers` | void | register a callback triggered when a user is added o updated

### Agent 

method | return | description
---|---|---
`getAgent` | AgentDetails | get agent info by agent id
`createUser` | AgentDetails | create chat agent reference
`updateAgent` | AgentDetails | update chat agent
`updateAgentDeviceToken` | void | update device token in order to receive notifications

### Room 

method | return | description
---|---|---
`getRooms` | RoomDetails[] | get rooms details collection with pagination
`getRoomDetails` | RoomDetails | get room details
`createRoomWithUsers` | RoomDetails | create private or group room object
`createRoomForAgents` | RoomDetails | create an agent room based on a specific tag 
`joinUser` | RoomDetails | add a user to a group room
`joinAgent` | RoomDetails | add an agent to an agent room, an agent must be added to the room in order to have write permissions
`removeUser` | RoomDetails | remove a user from a group room
`sendTextMessage` | MessageType.Any | send a message
`sendFileMessage` | MessageType.Any | send a message with an attachement, it handles file upload
`sendFileMessageFromUrl` | MessageType.Any | send a message with an attachement, it uses file url passed as argument to store file
`readMessage` | void | mark message read for one user
`deleteMessage` | void | delete message for all room users
`getRoomMedia` | MessageType.MediaInfo[] | get room media filtered by content type
`fetchRooms` | void | register a callback triggered when a room is added or updated
`fetchRoomsByAgent` | void | register a callback triggered when a room with one or more tags is added or updated
`fetchMessages` | void | register a callback triggered when messages are added to a room

## Create an Halo Module

In order to create an **Halo Module**, init a React Native library, you can use [create-react-native-library](https://github.com/callstack/react-native-builder-bob).

Then add Halo dependency:
```
yarn add @wezard/halo-core
```

Now you have to implements `IUser`, `IAgent` and `IRoom` interfaces:

- `user.ts`
```typescript
import { IUser } from '@wezard/halo-core'

export class User implements IUser {
    // implements IUser methods
}
```

- `agent.ts`
```typescript
import { IAgent } from '@wezard/halo-core'

export class Agent implements IAgent {
    // implements IAgent methods
}
```

- `room.ts`
```typescript
import { IRoom } from '@wezard/halo-core'

export class Room implements IRoom {
    // implements IRoom methods
}
```

And create an `index.ts` file that exports classes

```typescript
export * from './agent'
export * from './room'
export * from './user'
```






[npmjs-badge]: https://img.shields.io/npm/v/@wezard/halo-core.svg?logo=npm
[npmjs-com]: https://www.npmjs.com/package/@wezard/halo-core
[standard-wezard-badge]: https://img.shields.io/badge/sdk-wezard-F26D50.svg
[standard-wezard]: https://github.com/wezard-it/halo-core
