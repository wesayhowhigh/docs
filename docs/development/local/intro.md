---
sidebar_position: 1
sidebar_label: Introduction
---

# Setting Up Your Workstation
On your Mac you'll likely to need the following installed:

- [GIT](https://git-scm.com/download/mac) - For working on projects
- [Laravel Herd](https://herd.laravel.com/) - Our newer method for running websites locally (handles Composer, PHP and Node versions for you)
- [Composer](https://getcomposer.org/) - Optional. For installing PHP Packages
-[Node & NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Node Package Manager)- For installing Javascript packages and running node commands. Minimum version is 8, with most newer sites running on 14+
- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) (Node Version Manager) - For running multiple versions of Node
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) - For running legacy websites (OctoberCMS v1 and v1.1)using Docker containers

## Legacy websites
There is a `/dev` script in the root of most legacy projects that runs composer, node and php commands through specific Docker containers. 
But if you're wanting to run the commands locally, you'll also need:

- [Node & NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (Node Package Manager)- For installing Javascript packages and running node commands. Minimum version is 8, with most newer sites running on 14+
- [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) (Node Version Manager) - For running multiple versions of Node
- PHP - Recommended to install via HomeBrew.

## Docker

All of our sites built since 2017 are developed within a Docker container and orchestrated with Docker Compose - so it's integral to install Docker Desktop.

Locally, a standard October Website will have a `docker-compose.yaml` with a docker container for, at minimum, the app and one for the database. Some sites may also have docker containers for Caddy (providing SSL to the app), Node (for running npm commands) and even Redis (for queues or caching).

Our sites use a range of Docker images built upon Alpine that can be found on [our Github repository](https://github.com/wesayhowhigh/docker) and are stored publicly on [DockerHub](https://hub.docker.com/).

When site instances are created, their Docker Images are securely stored on our private Registry - currently on AWS (Amazon Elastic Container Registry)
