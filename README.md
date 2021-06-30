# Introduction

Welcome to the future. I'm glad you've made it. Take your shoes off and grab a warm cup of hot chocolate and blanket, and sit down, only if you perfer, of course.

This project allows users to centrally control their boilerplate stuff. There are two sides to this, the side that provides the boilerplate, and the side that consumes the boilerplate. You can view examples in the examples folder.

#  To create your own

1. Create an npm package. The recommended naming style is `centralized-boilerplate.x`. Where `x` is something useful to you, like `package`, `service`, or something else. It depends how you conceptually group your stuff. You might want to maintain multiple packages, depending on your groupings. If you have a private NPM organization, then you can of course do `@scope/centralized-boilerplate.x`
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
1. Boom! You're done! See here for an example: https://github.com/pizza-programming-party/centralized-boilerplate/tree/main/examples/base-provider

# How to use
1. Add the package as a dev dependency. In the following example, it will be called `centralized-boilerplate.something` but you should replace this with a specific package.
    ```
    npm install centralized-boilerplate.something --save-dev
    ```
1. Add the boil command in your package.
    ```
    "scripts": {
      "boil": "node ./node_modules/centralized-boilerplate.something/bin/run.js"
    }
    ```
1. Run the command.
    ```
    npm run boil
    ```
1. Scream in horror as computers are beginning to take your job. See here for an example: https://github.com/pizza-programming-party/centralized-boilerplate/tree/main/examples/base-consumer


# Don't like a decision a maintainer made?
Then sue them! Wait... no, that's not what the script says. *Ahem.* Then blacklist it. In the root folder of your project, you can create a file called `centralized-boilerplate.json` and add the following.
```
{
  "blacklist": [
    [ "whatever.txt" ]
  ]
}

```
Where `blacklist` is an array of filenames you do not want touched.
