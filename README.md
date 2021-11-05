# Harvest Dashboard

![GitHub release (latest by date)](https://img.shields.io/github/v/release/vincentrohde/harvest-dashboard)
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/vincentrohde/harvest-dashboard)
[![Deployment](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/deploy.yml/badge.svg)](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/vincentrohde/harvest-dashboard/actions/workflows/codeql-analysis.yml)

[![](https://tokei.rs/b1/github/vincentrohde/harvest-dashboard?category=code)](https://github.com/vincentrohde/harvest-dashboard)
[![](https://tokei.rs/b1/github/vincentrohde/harvest-dashboard?category=files)](https://github.com/vincentrohde/harvest-dashboard)

A third-party React.js client for the [Harvest API V2](https://help.getharvest.com/api-v2/), that helps you to manage the time-trackings of your Harvest Account, while also giving you statistical feedback on how you spend your time.

**Disclaimer: This project is not affiliated with Harvest**


## Contents

1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Installation](#installation)
    3. [Access to Harvest](#access-to-harvest)
    4. [Start the Project](#start-the-project)
2. [Features](#features)
    1. [Semantic UI](#semantic-ui)
    2. [Chart.js](#chartjs)
    3. [Components](#components)
    4. [Services](#services)
3. [Development](#development)
    1. [Branches](#branches)
    2. [Types files](#types-files)
    3. [Workflows](#workflows)
4. [Production](#production)
    1. [Automatic Deploy (fork)](#automatic-deploy-fork)
    2. [Manual Deploy (no fork)](#manual-deploy-no-fork)

## Getting Started

### Prerequisites

First of all, you will need a [Harvest account](https://www.getharvest.com) to fully use this project. The [free version](https://www.getharvest.com/pricing) will do fine. To run the client, 
you need to have **Node.js** and its package manager **npm** installed on your environment.

### Installation

#### Clone repository

```
git clone https://github.com/vincentrohde/harvest-dashboard.git
cd ./harvest-dashboard
```



#### Install dependencies
This is for your dev environment (ex. IDE auto-completion, Typescript, etc.). The `node_modules` used by Docker are installed later on 😉

```
cd ./server && npm install
cd ../client && npm install
cd ..
```

### Access to Harvest

#### Add an .env file

Start by creating your own `.env` file in the `/server` directory. You can use the `.env.example` file and just create a copy of it, with the filename `.env` like so:

````
cp ./server/.env.example ./server/.env
````

#### Harvest v2 Personal Access Token

If you have your [Harvest account](https://www.getharvest.com) ready. It's time to setup your own Personal Access Token. To do so, jump over to the [Developers section](https://id.getharvest.com/developers) of your account.

Under the tab **Personal Access Tokens** you will find the option **Create New Personal Access Token**

![](./assets/harvest-developers-section.png)

First of all start by setting the name for your token.

![](./assets/harvest-token-create-exif.png)

#### Setup Access to your Harvest Account

Now that you have your Personal Access Token. It's time to add its data to your `.env` file in `./server`. The fields marked in red (see below) are required in your `.env` file.

![](./assets/harvest-token-data.png)

This should be your version of `./server/.env` :

```
HARVEST_API_URL=https://api.harvestapp.com
ACCESS_TOKEN={{ Insert "Your Token" here }}
ACCOUNT_ID={{ Insert "Account ID" here }}
READ_ONLY=false
```

### Start the Project

Now that you have everything in place you can start the project.

```
npm run dev:install
npm run dev:up
```

The project will be available via

```
http://localhost
```

The api will be available via

```
http://localhost/api/
```

## Features

### Semantic UI

When implementing templates, the project makes use of [Semantic UI](https://semantic-ui.com/) through [semantic-ui-react](https://react.semantic-ui.com/).

### Chart.js

When implementing data visualization, the project makes use of [chart.js](https://www.chartjs.org/docs/latest/).

### Components

#### DatePicker

With the `DatePicker` component you are able, to either select a certain date, a date range or a preset date range. On default, the `today` preset is selected.

##### Presets

| Preset | Output | Format |
|---|---|---|
| `today` | `[currentDay]` | `<'DD-MM-YYYY'>[]` |
| `one-week` | `[6 days ago, currentDay]` | `<'DD-MM-YYYY'>[]` |
| `one-month` | `[29 days ago, currentDay]` | `<'DD-MM-YYYY'>[]` |
| `one-year` | `[364 days ago, currentDay]` | `<'DD-MM-YYYY'>[]` |
| `all` | `1` | `number` |

Once a date value (either a single date, a date-range or 1) is set, the applications redux store (`store.filters.dateRange`) will be updated. When the `dateRange` property is updated, the application will request new time-entries from the backend.

#### EditForm

The `EditForm` component allows you to add new time-entries as well as updating existing ones.

##### Props

The following props can be passed to the `EditForm` component, but are not required.

| Prop | Information | Default |
|---|---|---|
| `data` | data of the time-entry | * |
| `onSuccess` | callback when submit succeeds | `() => {}` |
| `onCancel` | callback when submit was cancelled | `() => {}` |

*) If no data is provided, the component will fall back on its `defaultData` which can be found in `EditForm/defaultData.ts`. This will be then handled as a `isNewEntry`.

##### onChange

Whenever the user makes updates to the data, the component will update its `lastInputChange` state (latest field that was updated).

##### useErrorCheck

The `EditForm` component comes with its own hook called `useErrorCheck`. It passes `lastInputChange` and `entry` as props to the hook.

The `entry` prop is debounced (using `useDebounce`) and is compared with its `prevDebouncedEntry` prop. This is supposed to prevent error-checking while the user is still typing and unecessary error-checking if the content did not change.

The fields that are checked, are `hours` and `spent_date`. If the hook finds any errors it will return the list of field-names, that are not matching the format.

##### onSubmit

When a new entry is submitted by the user, the component will reset itself to default with `resetStateToDefault()`. In both cases (create or update an entry) the `onSuccess` callback method is executed.

#### DataOverview

The `DataOverview` component gives the user a data-visualisation of his/ her time-entries.

It's possible to filter by tasks or projects and sort by time-unit (day, week, month or year).

### Services

Services are classes that bundle various utility functions, that belong to a certain topic (ex. time-formatting). Server and client each have their own services.

Each service is written in the same pattern:

```
class ExampleService {
    ...
}

const exampleService = new ExampleService();
export default exampleService;
```

#### ApiService

Communication (create, read, update, delete) to the backend by the client using axios.

#### ApiService (Server)

Communication (create, read, update, delete) to the Harvest API by the server using axios.

#### TimeService

Time utility functions (ex. comparing or formatting dates) using `moment.js`.

## Development

### Branches

#### master
The `master` branch is used as the project's release branch. No development should happen here.

#### develop
The `develop` branch is used as a collection for changes that will end up as a new release. In general, new pushes should only come through merging `feature/` or `bug/` branches into `develop`.

#### feature/

A `feature/**` branch should be used for the development of a new feature. When the feature is ready, a `Pull Request` into `develop` should be opened.

#### bug/

A `bug/**` branch should be used when fixing bug-issues. When the bug is fixed, a `Pull Request` into `develop` should be opened.

### Types files

To prevent cluttering regular files with Typescript declarations (ex. interfaces, types, etc.). they should be moved into a separate file using the `.types` naming. The regular file will then import the `.types` file declarations.

**Example**

This is an example for a React component:

```
+ MyComponent
|   + MyComponent.tsx
|   + MyComponent.types.ts
```

```
// MyComponent.types.ts
export interface MyComponentProps {
    title: string;
}
```

```
// MyComponent.tsx

// Types
import { MyComponentProps } from './MyComponent.types';

const MyComponent = ({ title }: MyComponentProps) => <h2>{ title }</h2>;

export default MyComponent;
```

### Workflows

#### Github Release Action

The `Github Release Action` workflow is triggered once a new push on `master` happens. This will generate a new minor tag of the project, which will automatically be released.

#### Github Patch Action

The `Github Patch Action` workflow is triggered once a new push on `develop` happens. This will generate a new patch tag of the project. This patch tag is not released.

#### Deployment

The `Deployment` workflow can be triggered manually or with push to `master`. It will deploy a production-ready version of the project to the server.

## Production

There are two ways you can deploy the project. In case you have forked the repository see the next section. If you didn't fork the repository, please follow the [manual deployment guide](#manual-deploy-no-fork).

### Automatic Deploy (fork)

If you have forked this repository you can automatically deploy the project using the `Deployment` workflow.

#### Adding Secrets

To do this, you will need to add a few new GitHub secrets to your repo (the fork)

Go to your forked repository on Github and open the `Settings` tab. Now navigate to `Secrets` and click on `New Repository Secret`. Add the following secrets to your repository.

| Secret Name | Information |
|---|---|
| `SSH_KEY` | Your SSH key, with access to your server |
| `SSH_HOST` | Your server's IP address |
| `SSH_USER` | The server's user you log into with when using ssh |
| `SSH_LOCATION` | The directory on your server, where the repo should be deployed to (remote directory) |

#### Deploying

Now you can deploy either through pushing new commits to your `master` branch or through the `Actions` tab of your repository.

Here you will find a workflow called `Deployment`. If you click on `Run Workflow`, you will be able to deploy with any of your repository's branches.

### Manual Deploy (no fork)

If you have not created a fork of the repository, this is the guide to deploying the code. The guide assumes you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

#### Copy to server

For the deploy you can either clone the project on your server (if you have git installed) or use ssh (scp or rsync) to copy it.

##### scp

If you have `rsync` installed you can skip copying with `scp`.

```
scp -r /path/to/local/copy user@your-server-ip:/path/to/remote/copy
```

##### rsync (alternative, recommended)

If you already copied using `scp`, you can skip this part.

```
rsync -avz -e 'ssh' /path/to/local/copy user@your-server-ip:/path/to/remote/copy
```

#### Start containers

The rest is fairly simple. Run the following command in the root of the project's directory.

```
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml build --no-cache
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d
```

If you have [Make](https://www.gnu.org/software/make/manual/make.html) installed this command will also do the same.

```
make prod:install
make prod:up
```

#### Containers

##### harvest-app

This container runs two services. First, it builds a production version (`/dist`) of the client (`build-service`). This version will then be served by `ngnix` (`nginx-server`) as well as the api (through reverse-proxying). The container will be available under:

```
http://localhost
```

##### api

This `Node.js` container will provide an `Express.js` api for your client server. It will be available under:

```
http://localhost/api/
```

#### Stop containers

In case you want to stop the containers you can either run

```
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml down
```

or

```
make prod:down
```

#### Uninstall containers

In case you want to stop the containers you can either run

```
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml down --rmi all
```

or

```
make prod:uninstall
```

<a href="#harvest-dashboard">Back To Top</a>
