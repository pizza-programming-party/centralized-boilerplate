
import * as child from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import * as lodash from 'lodash'

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
  const destinationPath = process.cwd()
  const configuration = getConfiguration(destinationPath)

  log(
    sourcePath,
    destinationPath,
    configuration
  )

  const entries = prepare(
    sourcePath,
    destinationPath,
    list,
    configuration
  )

  entries.map((entry) => {
    if (entry.action === 'full-text-replace') {
      copy(entry.source, entry.destination)
    } else if (entry.action === 'json-merge') {
      jsonMerge(entry.source, entry.destination)
    }
  })

  console.log('done!')
}

type Extras = {
  [value: string]: {
    [option: string]: MoveCommand[]
  }
}

export function conditional(
  sourceBasePath: string,
  extras: Extras
) {
  const destinationPath = process.cwd()
  const configuration = getConfiguration(destinationPath)
  if (configuration.custom !== undefined) {
    console.log('Extras found...')
    for (const [key, value] of Object.entries(configuration.custom)) {
      if (extras[key] !== undefined) {
        console.log(`Found matching key for ${key}`)
        const options = extras[key]
        if (options[value] !== undefined) {
          console.log(`Found matching value for ${value}`)
          run(sourceBasePath, options[value])
        } else {
          console.log(`Not matching value for ${value}`)
        }
      } else {
        console.log(`No matching key for ${key}`)
      }
    }
  } else {
    console.log('No extras found...')
  }
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
    return {
      blacklist: []
    }
  }
}

function log (
  sourcePath: string,
  destinationPath: string,
  configuration: Object
): void {
  console.log('sourcePath', sourcePath)
  console.log('destination', destinationPath)
  console.log('configuration', JSON.stringify(configuration, null, 2))
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

function jsonMerge (
  source: Location,
  destination: Location
): void {

  try {
    console.log(destination.filepath)

    const destinationPath = getPath(destination)
    const currentContent = JSON.parse(read(destinationPath))

    const sourcePath = getPath(source)
    const additionalContent = JSON.parse(read(sourcePath))

    const result = lodash.assign(currentContent, additionalContent)

    write(destinationPath, JSON.stringify(result, null, 2))
  } catch (error) {
    console.log('Error while trying to merge json.')
    console.log(error)
    console.log('skipping...')
  }

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

export interface InstallCommand {
  name: string
  version: string
  environment: 'development' | 'production'
}

export function install(packages: InstallCommand[]) {
  const destinationPath = process.cwd()
  const configuration = getConfiguration(destinationPath)

  if (configuration.shouldInstall !== true) {
    return
  }
  console.log('Running the install command, this is an experimental feature.')
  console.log('You have opted into it via the centralized-package.json shouldInstall flag')
  console.log('Packages are not checked for code injection trolly-boi stuff, whomp!')
  console.log('')
  console.log('So only use trusted packages, mkay.')

  for (let i = 0; i < packages.length; i ++) {
    const p = packages[i]
    const modifier = p.environment === 'production' ? '--save' : '--save-dev'
    const command = `npm install ${p.name}@${p.version} ${modifier}`
    console.log(`Running "${command}"`)
    try {
      child.execSync(command)
    } catch (error) {
      console.log('An error happened while running', command)
      console.log(error.messge)
    }
  }
}
