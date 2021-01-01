
const r = require('../index')

r.run([
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
