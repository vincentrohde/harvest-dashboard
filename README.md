# Harvest Dashboard

![GitHub release (latest by date)](https://img.shields.io/github/v/release/vincentrohde/harvest-dashboard)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/vincentrohde/harvest-dashboard)
[![Deployment](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/deploy.yml/badge.svg)](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/codeql-analysis.yml)

[![](https://tokei.rs/b1/github/vincentrohde/harvest-dashboard?category=code)](https://github.com/vincentrohde/harvest-dashboard)
[![](https://tokei.rs/b1/github/vincentrohde/harvest-dashboard?category=files)](https://github.com/vincentrohde/harvest-dashboard)

A third-party React.js client for the [Harvest API V2](https://help.getharvest.com/api-v2/), that helps you to manage the time-trackings of your Harvest Account, while also giving you 
statistical feedback on how you spend your time.

## Table of Contents

1. <a href="#getting-started">Getting Started</a>
2. <a href="#built-with">Built With</a>

## Getting Started

### Prerequisites

First of all, you will need a [Harvest account](https://www.getharvest.com) to fully use this project. The [free version](https://www.getharvest.com/pricing) will do fine. To run the client, 
you need to have **Node.js** and its package manager **npm** installed on your environment.


### Installation

Clone the repository

```
git clone https://github.com/vincentrohde/harvest-dashboard.git
```

Install the dependencies

```
npm install
```

Start the server

```
npm start
```

Now you can run the app in your browser, using this URL:

```
http://localhost:8080
```

## Development

### Branches

#### master
The `master` branch is used as the project's release branch. No development should happen here, since every `push` (newest commit) to `master` will generate a new `minor version release` of the project, which will also end up starting a new `deployment` workflow.

#### develop
The `develop` branch is used as a collection for changes that will end up as a new release. In general, new pushes should only come through merging `feature/` or `bug/` branches into `develop`. Each push results in a `patch` version bump, that is handled as a `pre-release`. For smaller issues it's fine to commit directly into `develop`.

#### feature/

A `feature/**` branch should be used for the development of a new feature. When the feature is ready, a `Pull Request` into `develop` should be opened.

#### bug/

A `bug/**` branch should be used when fixing bug-issues. When the bug is fixed, a `Pull Request` into `develop` should be opened.

### Workflows

## Features

## Built With

- [React](https://reactjs.org/)
- [SCSS](https://github.com/sass/node-sass)
- [Redux](https://github.com/reduxjs/redux)

<a href="#harvest-dashboard">Back To Top</a>
