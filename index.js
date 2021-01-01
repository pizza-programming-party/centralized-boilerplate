
const path = require('path')
const fs = require('fs')

function run(sourceBasePath, list) {
  console.log('Guten tag, it is me, Mr Boiler.')
  console.log('I am here to setup your stuff.')

  const sourcePath = path.resolve(sourceBasePath, 'assets')
  console.log('sourcePath', sourcePath)

  const destinationPath = process.cwd()
  console.log('destination', destinationPath)

  const blacklist = getBlacklist(destinationPath)

  console.log('This is the contents of your blacklist', blacklist)

  for (let i = 0; i < list.length; i++) {
    const entry = list[i]
    copy(
      blacklist,
      { basePath: sourcePath, filepath: entry.source },
      { basePath: destinationPath, filepath: entry.destination }
    )
  }

  console.log('done!')
}

function getBlacklist(destinationPath) {
  const fullPath = getPath({
    basePath: destinationPath,
    filepath: [ 'centralized-boilerplate.json' ]
  })
  try {
    return JSON.parse(read(fullPath))
  } catch (error) {
    console.log('No blacklist found, none will be used.')
    return {}
  }
}

function copy(blacklist, source, destination) {
  console.log(destination.filepath)

  for (let i = 0; i < blacklist.length; i++) {
    const entry = blacklist[i]
    if (JSON.stringify(entry) === JSON.stringify(destination.filepath)) {
      console.log('is in the blacklist, ignored.')
      return
    }
  }

  const sourcePath = getPath(source)
  const content = read(sourcePath)
  ensurePathExists(destination)
  const destinationPath = getPath(destination)
  write(destinationPath, content)
}

function read(fullPath) {
  return fs.readFileSync(fullPath, 'utf8')
}

function ensurePathExists(config) {
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

function write(fullPath, content) {
  return fs.writeFileSync(fullPath, content, 'utf8', 'w')
}

function getPath(config) {
  return path.resolve(config.basePath, ...config.filepath)
}

module.exports = { run }
