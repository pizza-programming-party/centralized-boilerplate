
import * as lodash from 'lodash'

export interface MoveCommand {
  action: 'full-text-replace',
  source: string[]
  destination: string[]
}

export type Configuration =
  | Configuration_v1
  | Configuration_v2

type Configuration_v1 = string[][]

interface Configuration_v2 {
  blacklist: string[][]
}

export interface SubsystemMoveCommand {
  source: Location
  action: 'full-text-replace'
  destination: Location
}

export interface Location {
  basePath: string
  filepath: string[]
}

export function prepare (
  sourcePath: string,
  destinationPath: string,
  list: MoveCommand[],
  configuration: Configuration
): SubsystemMoveCommand[] {
  const content = []

  for (let i = 0; i < list.length; i++) {
    const entry = list[i]
    if (!shouldCopy(configuration, entry)) {
      continue
    }
    content.push({
      action: entry.action,
      source: {
        basePath: sourcePath,
        filepath: entry.source
      },
      destination: {
        basePath: destinationPath,
        filepath: entry.destination
      }
    })
  }
  return content
}

function shouldCopy (
  configuration: Configuration,
  command: MoveCommand
): boolean {
  const content = lodash.isArray(configuration)
    ? configuration
    : configuration.blacklist

  for (let i = 0; i < content.length; i++) {
    const entry = content[i]
    if (lodash.isEqual(entry, command.destination)) {
      return false
    }
  }
  return true
}
