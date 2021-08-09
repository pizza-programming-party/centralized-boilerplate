# Introduction

Welcome to the future. I'm glad you've made it. Take your shoes off and grab a warm cup of hot chocolate and a blanket, and sit down, only if you perfer, of course.

This project allows users to centrally control their boilerplate stuff. There are two sides to this, the side that provides the boilerplate, and the side that consumes the boilerplate. You can view examples of both in the examples folder.

Here is a list of cool, pre-made with love boilerplates:
* [centralized-boilerplate.package](https://github.com/pizza-programming-party/centralized-boilerplate.package)

# How to use
If you're new to this concept, then this is probably the right section for you.

1. Add the package as a dev dependency. In the following example, we will use `centralized-boilerplate.package` but you may want to replace this with another package.
    ```
    npm install centralized-boilerplate.package --save-dev
    ```
1. Run the script to setup the boilerplate.
    ```
    node ./node_modules/centralized-boilerplate.package/bin/run.js
    ```
3. If the boil script wasn't automatically added by the previous step, then you can add it manually.
    ```
    "scripts": {
      "boil": "node ./node_modules/centralized-boilerplate.package/bin/run.js",
      ...
    }
    ```
1. Scream in horror as computers are beginning to take your job. Oh, the irony. See here for an example: https://github.com/pizza-programming-party/centralized-boilerplate/tree/main/examples/base-consumer

Whenever a new version of `centralized-boilerplate.package` is published you can run the boil command to have the changes applied to your project.

## Don't like a decision a maintainer made?
Then sue them! Wait... no, that's not what I wanted to say *Ahem.* Excuse me, then blacklist it. In the root folder of your project, you can create a file called `centralized-boilerplate.json` and add the following:
```
{
  "blacklist": [
    [ "whatever.txt" ],
    [ "directory", "whatever2.json" ]
  ]
}

```
Where `blacklist` is an array of realative paths to specific files that you do not want touched.

#  To create your own
If you company has specific boilerplate code you need in each repoistory, or if there isn't a boilerplate template for your usecase yet, then these are the steps for you.

1. Create an npm package. The recommended naming style is `centralized-boilerplate.x`. Where `x` is something useful to you, like `package`, `service`, or something else. It depends how you conceptually group your stuff. You might want to maintain multiple packages, depending on your groupings. If you have a private NPM organization, then you can of course do `@scope/centralized-boilerplate.x`
1. Add package as a dependency.
    ```
    npm install centralized-boilerplate --save
    ```
1. Add an `assets` folder and put cool things in it. Note: files that begin with a period are not published by NPM, so you should not name them like as so, but this library allows you to rename files when they are copied.
2. Create a file `./bin/run.js`, put this code in there:
    ```
    #! /usr/bin/env node

    const boiler = require('centralized-boilerplate')
    const path = require('path')

    boiler.run(path.resolve(__dirname, '..'), [
      {
        source: [ 'gitignore' ],
        destination: [ '.gitignore' ]
      }
    ])
    ```
1. Make the file executable. chmod +x boil (TODO: confirm that this is really needed.)
1. Add the following to the `package.json` file. (TODO: confirm that this is really needed.)
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
1. Boom! You're done! Sream with joy at automating another task. See here for an example: https://github.com/pizza-programming-party/centralized-boilerplate/tree/main/examples/base-provider
