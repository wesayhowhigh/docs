---
sidebar_position: 2
sidebar_label: Starting a New Site
---

# Starting a New Site

## Setting up

### Clone The Base Project

Use Git in your Terminal to clone the [Base October Project](https://github.com/wesayhowhigh/base-3)

```shell
git clone git@github.com:wesayhowhigh/base-3.git NAME_OF_YOUR_PROJECT_FOLDER
```

Once inside the new folder you'll need to do the following:

### Reset Git for project

As you cloned `base`, this new project will still be attached to the `base` repository.
We want to remove that and set it up for your new project

```shell
rm -rf .git
```
This will remove any remnants of github from this new project

```shell
git init
```
This will initialise the new project as a fresh Github project to track changes with.


### Copy the example ENV file to a real ENV file:
```shell
cp .example.env .env
```

### Install PHP packages

Use your systems composer or the `dev` script to install the PHP packages:

```shell title="Using system composer"
composer install --ignore-platform-reqs
```

```shell title="Using dev script"
./dev composer install
```

### Install Javascript/CSS packages

Either use your systems Node Version Manager (nvm) or the `dev` script to install packages

```shell title="Using system composer"
# This sets the node version to the one used in the projects .nvmrc file
nvm use 

# This installs the JS packages
npm install

# This runs the development script and builds the bundle
npm run dev
```

```shell title="Using dev script"
# This installs the JS packages
./dev npm install

# This runs the development script and builds the bundle
./dev npm run dev
```

## Launch the site

Use Docker to launch the website, including all relevant apps such as mysql, redis, caddy.
```shell 
docker compose up
```
:::note
You can add the `-d` flag to detach the docker logs from the terminal if you wish - but it can be useful to keep it running so you can easily spot any critical errors with any of the apps
:::

## Accessing the containers

You can connect to the primary application by typing the following command in your terminal:
```shell
docker exec -it app sh
```
You can then run various commands such as modifying the .env with `vi .env` or run Artisan commands with `php artisan`


## Bringing the site down
Use Docker to bring down the website, including all relevant apps such as mysql, redis, caddy.
```shell 
docker compose down
```
If you've ran `docker compose up` without detaching, then cancelling the command in that terminal window (using ctrl + c) may also close the containers (though not necessarily in the same way `docker compose down` does)

