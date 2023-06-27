/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { HaloModule } from './core'
import type { Agent, AgentDetails, User, UserDetails } from './types'

export const loadModule = async (module: HaloModule) => {
  switch (module) {
    case 'firebase':
      // @ts-ignore
      return await import('@wezard/react-native-halo-firebase')
    default:
      throw new Error('Module unavailable')
  }
}

export const userToUserDetails = (user: User): UserDetails => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    nickname: user.nickname,
    metadata: user.metadata,
  }
}

export const agentToAgentDetails = (agent: Agent): AgentDetails => {
  return {
    id: agent.id,
    firstName: agent.firstName,
    lastName: agent.lastName,
    image: agent.image,
    metadata: agent.metadata,
  }
}
