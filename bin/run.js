#! /usr/bin/env node

const r = require('../index')
const path = require('path')

r.run(path.resolve(__dirname, '..'), [
  {
    source: [ 'gitignore' ],
    destination: [ '.gitignore' ]
  },
  {
    source: [ 'editorconfig' ],
    destination: [ '.editorconfig' ]
  },
  {
    source: [ 'gitlab-ci.yml' ],
    destination: ['.gitlab-ci.yml' ]
  },
  {
    source: [ 'vscode', 'extensions.json' ],
    destination: [ '.vscode', 'extensions.json' ]
  }
])
