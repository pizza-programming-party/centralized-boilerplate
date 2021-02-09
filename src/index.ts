
import * as path from 'path'
import * as fs from 'fs'
import * as lodash from 'lodash'

export interface Configuration {
  source: string[]
  destination: string[]
}

interface Location {
  basePath: string
  filepath: string[]
}

type Blacklist = string[][]

export function run (
  sourceBasePath: string,
  list: Configuration[]
): void {
  const sourcePath = path.resolve(sourceBasePath, 'assets')
  console.log('sourcePath', sourcePath)

  const destinationPath = process.cwd()
  console.log('destination', destinationPath)

  const blacklist = getBlacklist(destinationPath)

  for (let i = 0; i < list.length; i++) {
    const entry = list[i]
    if (!shouldCopy(blacklist, entry)) {
      continue
    }
    copy(
      {
        basePath: sourcePath,
        filepath: entry.source
      },
      {
        basePath: destinationPath,
        filepath: entry.destination
      }
    )
  }

  console.log('done!')
}

function getBlacklist (
  destinationPath: string
): Blacklist {
  const fullPath = getPath({
    basePath: destinationPath,
    filepath: ['centralized-boilerplate.json']
  })
  try {
    return JSON.parse(read(fullPath))
  } catch (error) {
    console.log('No blacklist found, none will be used.')
    return []
  }
}

function copy (
  source: Location,
  destination: Location
): void {
  console.log(destination.filepath)
  const sourcePath = getPath(source)
  const content = read(sourcePath)
  ensurePathExists(destination)
  const destinationPath = getPath(destination)
  write(destinationPath, content)
}

function shouldCopy (
  blacklist: Blacklist,
  command: Configuration
): boolean {
  for (let i = 0; i < blacklist.length; i++) {
    const entry = blacklist[i]
    if (lodash.isEqual(entry, command.destination)) {
      return false
    }
  }
  return true
}

function read (
  fullPath: string
): string {
  return fs.readFileSync(fullPath, 'utf8')
}

function ensurePathExists (
  config: Location
): void {
  for (let i = 0; i < config.filepath.length; i++) {
    const parts = config.filepath.slice(0, i)

    const tempPath = getPath({
      basePath: config.basePath,
      filepath: parts
    })

    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath)
    }
  }
}

function write (
  fullPath: string,
  content: string
): void {
  return fs.writeFileSync(
    fullPath,
    content,
    {
      encoding: 'utf8',
      flag: 'w'
    }
  )
}

function getPath (
  config: Location
): string {
  return path.resolve(
    config.basePath,
    ...config.filepath
  )
}
