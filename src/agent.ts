import type { AgentDetails } from './types'

export interface CreateAgentPayload {
  firstName: string
  lastName: string
  image?: string
  tags: string[]
}

export interface IAgent {
  /**
   * get agent details
   * @param agentId id of the agent
   */
  getAgent(agentId: string): Promise<AgentDetails>

  /**
   * create an agent object
   * @param data
   * @param agentId
   */
  createAgent(data: CreateAgentPayload, agentId?: string): Promise<AgentDetails>

  /**
   * update an agent object
   * @param data
   */
  updateAgent(data: Partial<CreateAgentPayload>): Promise<AgentDetails>

  /**
   * update agent device token, in order to receive notifications
   * @param agentId
   * @param token
   */
  updateAgentDeviceToken(agentId: string, token: string): Promise<void>
}
