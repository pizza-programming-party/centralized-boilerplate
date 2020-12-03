#! /usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('Yo, it is time to setup your stuff!')
console.log('__dirname: ' + __dirname)
console.log('__filename: ' + __filename)
console.log('process.cwd(): ' + process.cwd())

const destinationPath = process.cwd()

console.log('=====')
console.log('We will copy over a .gitignore file for you now...')


const gitignorePath = path.resolve(__dirname, '..', '.gitignore')

console.log(gitignorePath)

const content = fs.readFileSync(gitignorePath, 'utf8')
console.log(content)

fs.writeFileSync(path.resolve(destinationPath, '.gitignore'), content, 'utf8', 'w')