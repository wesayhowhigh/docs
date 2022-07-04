---
slug: /
sidebar_position: 1
---

# Development Intro

Welcome to the JUMP Documentation system.

If you wish to add to the Documentation system. Please see the guide on [Working on Documentation](./development/working-on-documentation)

:::danger REMEMBER

Do not add any sensitive information to the documentation system such as API keys, recovery codes etc. 
That stuff belongs within LastPass or Teams.

:::

## About JUMPs Development Process

### Backend 
At JUMP we develop in PHP 7.1 - 8.0 and primarily use [OctoberCMS](https://octobercms.com/) (Version 1.1 as of July 2022, with Version 3 currently being developed).

OctoberCMS is build upon the Laravel Framework and most of our legacy, pre-OctoberCMS sites are built in either just Laravel, or Sleeping Owl (in turn built upon Laravel).

Websites built with October 1.0 use [Laravel Framework 5.5](https://laravel.com/docs/5.5/).

Websites built with October 1.1 use [Laravel Framework 6](https://laravel.com/docs/6.x).

Websites built with October 3 will use [Laravel Framework 9](https://laravel.com/docs/9.x).

:::tip

Long story short: If you know your Laravel, you'll be fine

:::


### Frontend

Most standard OctoberCMS websites use a combination of vanilla Javascript and the [OctoberCMS Ajax Framework](https://docs.octobercms.com/1.x/ajax/introduction.html).

When sites need a more robust feature, [Vue JS](https://v2.vuejs.org/) is used (All sites currently use v2 as of July 2022, with v3 planning on being rolled out in the near future).

Some legacy websites are built with React JS but are few and far between.


:::tip

Long story short: If you know your Javascript and Vue, you'll be fine

:::


### Deployment

Currently, websites are deployed using [Semaphore CI v1](https://semaphoreci.com/wesayhowhigh/).

This is responsible for building the Docker Image for that specific version of the website, securely copying it to the Lightsail Server and running docker-compose up.

It also creates a backup of the old `docker-compose.prod.yml` file - ensuring true green-blue deployment (joking).

### Infrastructure

All websites are served with [PHP-FPM](https://php-fpm.org/) and using [NGINX](https://www.nginx.com/).

All websites that JUMP host are within Amazon Web Services and are made up of the following:

- AWS Lightsail - Hosting the application (via Docker and Docker Compose)
- AWS Lightsail Database Server - Shared Database Server within Lightsail. (Some sites have their own Database Server)
- AWS S3 - Asset Storage for all uploads and images
- AWS CloudFront - CDN for caching static content. SSLs are attached and terminated here.
- AWS Certificate Manager - For Importing and Generating SSL certificates
- AWS CloudFomation - Orchestrates the above services

