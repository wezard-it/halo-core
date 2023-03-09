import type { AgentDetails } from './types'

export interface CreateAgentPayload {
  firstName: string
  lastName: string
  image?: string
  tags: string[]
}

export interface IAgent {
  getAgent(agentId: string): Promise<AgentDetails>
  createAgent(data: CreateAgentPayload): Promise<AgentDetails>
  updateAgent(data: Partial<CreateAgentPayload>): Promise<AgentDetails>
  updateAgentDeviceToken(agentId: string, token: string): Promise<void>
}
