#! /usr/bin/env node

const r = require('centralized-boilerplate')
const path = require('path')

r.run(path.resolve(__dirname, '..'), [
  {
    action: 'full-text-replace',
    source: ['file0.txt'],
    destination: ['file0.txt']
  },
  {
    action: 'full-text-replace',
    source: ['folder', 'file1.txt'],
    destination: ['folder', 'file1.txt']
  },
  {
    action: 'full-text-replace',
    source: ['file2.txt'],
    destination: ['file2.txt']
  },
  {
    action: 'json-merge',
    source: ['package.json'],
    destination: ['package.json']
  }
])

r.install([
  {
    name: 'lodash',
    version: '3.9.0',
    environment: 'production'
  },
  {
    name: 'jasmine',
    version: '2.99.0',
    environment: 'development'
  }
])
