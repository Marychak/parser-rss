# Parser RSS 

This is a mono-repository for a project, with React and Express.JS using Lerna.

## Project structure

We have 2 packages inside the project:

- **frontend:** React.JS application.
- **backend** Express.JS application.

Each of the packages have their own `package.json` file, so they define their dependencies as well as they have fully autonomy.

```
|- package.json => root
|--- packages
|------ backend
|-------- package.json  => Express.JS project
|------ frontend
|-------- package.json => React APP
```

## Prerequisites

You need [yarn](https://classic.yarnpkg.com/en/docs/install/) to manage repo dependencies.

## How to install and execute

1. Clone this repository
2. Install the dependencies. Inside the root and each package.
   `$ yarn install`
3. Start both applications by executing yarn in root folder.
   `$ yarn start`