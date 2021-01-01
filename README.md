This project allows users to create a tool that allows them to centrally control their boilerplate code. There are two sides to this, the side that provides the boilerplate, and the side that uses the boilerplate. You can view examples in the examples folder.

#  To create your own

1. Create an npm package. The recommended naming style is `@scope/centralized-x-boilerplate`. Where `x` is something like `package`, `service`, or something else. It depends how you conceptually group your packages.
1. Add this package as a dependency.
1. Add an `assets` folder, put cool things in it. Note: files that begin a period are not published by NPM, so you should not name them like that, but this library allows you to rename files they are copied.
1. Create a file like this `./bin/boil`, but this code in there:
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

1. Add the package you've created above as a development dependency.
2. Add a script to the `package.json` file.
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
3. If for some reason, you don't want to copy a particular file, a configuration file called `centralized-boilerplate.json`
    ```
    [
      [ ".gitignore" ]
    ]
    ```
