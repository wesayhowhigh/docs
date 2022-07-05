---
sidebar_position: 2
sidebar_label: Basic Authentication
---

# Basic Authentication

Basic authentication adds simple basic HTTP authentication to the website. It protects the frontend and the backend from unauthorised access.

When creating a password ensure that a [password generator is used](https://passwordwolf.com/).

:::warning
It is strongly recommended setting a strong password when giving clients the details.
:::

## Configuration

To enable basic authentication on the site you must set `JUMP_HTTP_AUTH_ENABLED` to `true`.

A `JUMP_HTTP_AUTH_USERNAME` and `JUMP_HTTP_AUTH_PASSWORD` must be also be set for it to work.

:::info
Note that the `Authorization` CloudFront Header must be added to the WhiteList in the CloudFront distro config, otherwise it will not work and you will keep getting the popup
:::

## Setup

```dotenv title=".env"
JUMP_HTTP_AUTH_ENABLED=true
JUMP_HTTP_AUTH_USERNAME=admin
JUMP_HTTP_AUTH_PASSWORD=admin
```
