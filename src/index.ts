
import * as path from 'path'
import * as fs from 'fs'

import {
  Configuration,
  MoveCommand,
  Location,
  prepare
} from './engine'

export function run (
  sourceBasePath: string,
  list: MoveCommand[]
): void {
  const sourcePath = path.resolve(sourceBasePath, 'assets')
  console.log('sourcePath', sourcePath)

  const destinationPath = process.cwd()
  console.log('destination', destinationPath)

  const configuration = getConfiguration(destinationPath)
  console.log('configuration', JSON.stringify(configuration, null, 2))

  const entries = prepare(
    sourcePath,
    destinationPath,
    list,
    configuration
  )

  entries.map((entry) => {
    copy(entry.source, entry.destination)
  })

  console.log('done!')
}

function getConfiguration (
  destinationPath: string
): Configuration {
  const fullPath = getPath({
    basePath: destinationPath,
    filepath: ['centralized-boilerplate.json']
  })
  try {
    return JSON.parse(read(fullPath))
  } catch (error) {
    console.log('No configuration found, none will be used.')
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

function read (
  fullPath: string
): string {
  return fs.readFileSync(fullPath, 'utf8')
}

function ensurePathExists (
  location: Location
): void {
  for (let i = 0; i < location.filepath.length; i++) {
    const parts = location.filepath.slice(0, i)

    const tempPath = getPath({
      basePath: location.basePath,
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
  location: Location
): string {
  return path.resolve(
    location.basePath,
    ...location.filepath
  )
}
