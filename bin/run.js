#! /usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('Guten tag, it is me, Mr Boiler.')
console.log('I am here to setup your stuff.')

const sourcePath = path.resolve(__dirname, '..', 'assets')
const destinationPath = process.cwd()

console.log('* gitignore...')
const gitignoreContent = fs.readFileSync(path.resolve(sourcePath, 'gitignore'), 'utf8')
fs.writeFileSync(path.resolve(destinationPath, '.gitignore'), gitignoreContent, 'utf8', 'w')

console.log('* editorconfig...')
const editorconfigContent = fs.readFileSync(path.resolve(sourcePath, 'editorconfig'), 'utf8')
fs.writeFileSync(path.resolve(destinationPath, '.editorconfig'), editorconfigContent, 'utf8', 'w')

console.log('done!')
