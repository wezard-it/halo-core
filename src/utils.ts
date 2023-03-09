/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { HaloModule } from './core'

export const loadModule = async (module: HaloModule) => {
  switch (module) {
    case 'firebase':
      // @ts-ignore
      return await import('@wezard/react-native-halo-firebase')
    default:
      throw new Error('Module unavailable')
  }
}
