#! /usr/bin/env node

const r = require('centralized-boilerplate')
const path = require('path')

r.run(path.resolve(__dirname, '..'), [
  {
    source: [ 'file0.txt' ],
    destination: [ 'file0.txt' ]
  },
  {
    source: [ 'folder', 'file1.txt' ],
    destination: [ 'folder', 'file1.txt' ]
  },
  {
    source: [ 'file2.txt' ],
    destination: [ 'file2.txt' ]
  },
])
