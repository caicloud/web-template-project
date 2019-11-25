<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [Common Template Project](#common-template-project)
  - [About the project](#about-the-project)
  - [See also](#see-also)
  - [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Web Template Project

## About the project

The Web Template Project is a template for starting new web projects at Caicloud.

This Template

- is a SPA with React and Node.js Project using TypeScript
- uses Less as preprocessor
- testing with Jest and Enzyme
- uses webpack as module bundler

## Status

The template project is in alpha status.

### TODO

- lint
- git hooks
- tests

## See also

- [nirvana project template](https://github.com/caicloud/nirvana-template-project)
- [python project template](https://github.com/caicloud/python-template-project)
- [golang project template](https://github.com/caicloud/golang-template-project)

## Getting started

### Install

```bash
yarn
```

### Run dev-server

```bash
yarn watch
```

By default, webpack-dev-server listens to the `m12n.port` in `package.json`

### Build image

TBD.

### Run container

```bash
docker run -p <port>:3000 cargo.dev.caicloud.xyz/release/x-web:<VERSION> 
```

`port` MUST be one of endpoint-ports of modularize-web. 

### Layout

```
├── .github
│   ├── ISSUE_TEMPLATE.md
│   └── PULL_REQUEST_TEMPLATE.md
├── .gitignore
├── CHANGELOG.md
├── Makefile
├── OWNERS
├── README.md
├── build
│   └── x-web
│       └── Dockerfile
├── docs
├── package.json
├── release
│   └── x-web.yaml
├── client
│   ├── components
│   ├── menus
│   └── routes
├── server
├── scripts
│   └── read_cpus_available.sh
└── yarn.lock
```

A brief description of the layout:

- `.github` has two template files for creating PR and issue. Please see the files for more details.
- `.gitignore` varies per project, but all projects need to ignore node_modules directory.
- `CHANGELOG.md` contains auto-generated changelog information.
- `Makefile` is used to build the project. You need to tweak the variables based on your project.
- `OWNERS` contains owners of the project.
- `README.md` is a detailed description of the project.
- `build` contains scripts, yaml files, dockerfiles, etc, to build and package the project.
- `docs` for project documentations.
- `release` [chart](https://github.com/caicloud/charts) for production deployment.
- `scripts` shell scripts for extra works
- `client` for client side codes.
- `server` for server side codes, if any.
