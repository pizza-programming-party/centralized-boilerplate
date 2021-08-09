
import * as lodash from 'lodash'

export interface MoveCommand {
  action: 'full-text-replace' | 'json-merge'
  source: string[]
  destination: string[]
}

export interface Configuration {
  blacklist: string[][]
  shouldInstall?: boolean
  custom?: { [property: string]: string }
}

export interface SubsystemMoveCommand {
  source: Location
  action: 'full-text-replace' | 'json-merge'
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
  const blacklist = configuration.blacklist
  for (let i = 0; i < blacklist.length; i++) {
    const entry = blacklist[i]
    if (lodash.isEqual(entry, command.destination)) {
      return false
    }
  }
  return true
}
