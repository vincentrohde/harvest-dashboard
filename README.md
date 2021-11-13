# Harvest Dashboard

![GitHub release (latest by date)](https://img.shields.io/github/v/release/vincentrohde/harvest-dashboard)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/vincentrohde/harvest-dashboard)
[![Deployment](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/deploy.yml/badge.svg)](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/deploy.yml)

[![](https://tokei.rs/b1/github/vincentrohde/harvest-dashboard?category=code)](https://github.com/vincentrohde/harvest-dashboard)
[![](https://tokei.rs/b1/github/vincentrohde/harvest-dashboard?category=files)](https://github.com/vincentrohde/harvest-dashboard)

A third-party React.js client for the [Harvest API V2](https://help.getharvest.com/api-v2/), that helps you to manage the time tracking of your Harvest Account, while also giving you statistical feedback on how you spend your time.

**Disclaimer: This project is not affiliated with Harvest**


## Contents

1. [Getting Started](#getting-started)
2. [Run the Project](#run-the-project)
2. [Custom OAuth App](#custom-oauth-app)

## Getting Started

### Prerequisites

First, you will need a [Harvest account](https://www.getharvest.com) to fully use this project. The [free version](https://www.getharvest.com/pricing) will do fine. 

To run the project, 
you need to have **[Node.js](https://nodejs.org/en/)** and its package manager **[NPM](https://www.npmjs.com/)** installed on your environment. The project also supports [Docker 🐋](https://www.docker.com/)

### Installation

#### Clone repository

```
git clone https://github.com/vincentrohde/harvest-dashboard.git
cd ./harvest-dashboard
```

#### Run setup.sh
This will install the `node_modules` for your dev environment (ex. IDE auto-completion, Typescript, etc.) and add the required `.env` file.

```
./setup.sh
```

## Run the Project

Now that you have everything in place, you can start the dashboard.

### NPM

When you just started with programming, you can choose to run the dashboard using Node.js/ NPM.

```
npm run start:client:dev
```

### Docker  (Recommended)

If you have [Docker](https://www.docker.com/) installed, you can also run the client using Docker.

Make sure that the docker-network is available, by running:

```
npm run network
```

Then you can start the client via:

```
npm run client:dev:up
```

### Open in Browser

Either option (Node/ NPM or Docker) is perfectly fine to use. Now, the dashboard will be available via:

```
http://localhost:3000
```

For most cases, this will be enough to run the project. With this setup you will use the default development server, when you authorize your dashboard copy to access your Harvest Account.

## Custom OAuth App

If you want to use your own Harvest OAuth App, you can run your own custom server, see `./api` directory and your `.env` file.

### Custom Harvest OAuth App

First, you have to go to the [Developers section](https://id.getharvest.com/developers) of your account. Here you will have to use the `Create new OAuth2 application` button.

![](./assets/oauth-create.png)

Now you will be directed to the setup page. On this page, you will have to set the `Redirect URL` field, which is the URL of your custom server. Once everything is set, hit `Create application`.

![](./assets/oauth-setup.png)

Finally, you will arrive at the detail page of your OAuth App. The two parameters `Client ID` and `Client Secret` will be required in your `.env` file.

![](./assets/oauth-secrets.png)

### Update .env

When you have created your own OAuth App, you will have to update your `.env` file.

```
OAUTH_APP_ID={ the Client ID of your OAuth App }
OAUTH_APP_SECRET={ the Client Secret of your OAuth App }
```

### Run your Server

To run your server, you can choose between using NPM/ Node.js or Docker.

#### Docker (Recommended)

```
npm run api:dev:up
```

#### NPM

```
npm run start:api:dev
```

<a href="#harvest-dashboard">Back To Top</a>
