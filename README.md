# Harvest Dashboard

![GitHub release (latest by date)](https://img.shields.io/github/v/release/vincentrohde/harvest-dashboard)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/vincentrohde/harvest-dashboard)
[![Deployment](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/deploy.yml/badge.svg)](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/deploy.yml)

[![](https://tokei.rs/b1/github/vincentrohde/harvest-dashboard?category=code)](https://github.com/vincentrohde/harvest-dashboard)
[![](https://tokei.rs/b1/github/vincentrohde/harvest-dashboard?category=files)](https://github.com/vincentrohde/harvest-dashboard)

A third-party Next.js client for the [Harvest API V2](https://help.getharvest.com/api-v2/), that helps you to manage the time tracking of your Harvest Account, while also giving you statistical feedback on how you spend your time.

**Disclaimer: This project is not affiliated with Harvest**


## Contents

1. [Getting Started](#getting-started)
2. [Run the Project](#run-the-project)
2. [Custom OAuth App](#custom-oauth-app)

## Getting Started

### Prerequisites

First, you will need a [Harvest account](https://www.getharvest.com) to fully use this project. The [free version](https://www.getharvest.com/pricing) will do fine. 

To run the project, 
you need to have **[Node.js](https://nodejs.org/en/)** and its package manager **[NPM](https://www.npmjs.com/)** installed on your environment.

### Installation

#### Clone repository

```
git clone https://github.com/vincentrohde/harvest-dashboard.git
cd ./harvest-dashboard
```

#### Run setup.sh

This will install the `node_modules` and add the required `.env` file.

```
./setup.sh
```

## Run the Project

Now that you have everything in place, you can start the dashboard.

```
npm run dev
```

### Open in Browser

Now, the dashboard will be available via:

```
http://localhost:3000
```

## Custom OAuth App

If you want to use your own Harvest OAuth App, you can do so in the following way.

### Create your own Harvest OAuth App

First, you have to go to the [Developers section](https://id.getharvest.com/developers) of your account. Here you will have to use the `Create new OAuth2 application` button.

![](./assets/oauth-create.png)

Now you will be directed to the setup page. On this page, you will have to set the `Redirect URL` field, which is the URL of your application.

#### Development

```
http://localhost:3000
```

#### Production

```
https://www.yourwebsite.com
```

Once everything is set, hit `Create application`.

![](./assets/oauth-setup.png)

Finally, you will arrive at the detail page of your OAuth App. The parameter `Client ID` will be required in your `.env` file.

![](./assets/oauth-secrets.png)

### Update .env

When you have created your own OAuth App, you will have to update your `.env` file.

```
OAUTH_APP_ID={ the Client ID of your OAuth App }
```

<a href="#harvest-dashboard">Back To Top</a>
