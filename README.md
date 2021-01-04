This project allows users to centrally control their boilerplate stuff. There are two sides to this, the side that provides the boilerplate, and the side that consumes the boilerplate. You can view examples in the examples folder.

#  To create your own

1. Create an npm package. The recommended naming style is `@scope/centralized-x-boilerplate`. Where `x` is something like `package`, `service`, or something else. It depends how you conceptually group your packages.
1. Add this package as a dependency.
1. Add an `assets` folder and put cool things in it. Note: files that begin with a period are not published by NPM, so you should not name them like as so, but this library allows you to rename files when they are copied.
1. Create a file `./bin/boil`, put this code in there:
    ```
    #! /usr/bin/env node

    const r = require('centralized-boilerplate')
    const path = require('path')

    r.run(path.resolve(__dirname, '..'), [
      {
        source: [ 'gitignore' ],
        destination: [ '.gitignore' ]
      }
    ])
    ```
1. Make the file executable. chmod +x boil
1. Add the following to the `package.json` file. (TODO: is this really needed?)
    ```
    {
      "name": "..."
      ...
      ...
      "bin": {
        "boil": "./bin/boil"
      }
    }
    ```
1. Boom! You're done!

# To use:

1. Open the project you want to utilize this tool for.
1. Add the package you've created above as a development dependency.
1. Add a script to the `package.json` file.
    ```
    {
      "name": "..."
      ...
      ...
      "scripts": {
        "boil": "./node_modules/centralized-base-boilerplate-example/bin/boil"
      }
    }
    ```
1. If for some reason, you don't want to copy a particular file, create configuration file called `centralized-boilerplate.json` in the root directory.
    ```
    [
      [ ".gitignore" ]
    ]
    ```
1. Boom! You're done!
