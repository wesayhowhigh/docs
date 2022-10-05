---
sidebar_position: 1
sidebar_label: Auth
---

# Auth Plugin

## Introduction

A plugin implementing authentication.

## Installation

```bash
composer require jump/oc-auth-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-auth-plugin)

## Configuration

```env title=".env"
JUMP_AUTH_USER_MODEL=App\Users\Models\User
```

## Usage

:::info
It is recommended to `hideFromPages => true,` on authentication pagesections and only inlclude the in cms pages.
:::

### User Model

[See model](model)

### Login


[For more information see login](login)

### Example Page

```html
title = "Login"
url = "/login"
is_hidden = 0
layout = "main"
==
{% section 'login' %}
```

### Logout

[See login](logout)

### Password Reset

[See login](password-reset)

## Troubleshooting

+ If you are having issues installing >= 1.30 try composer require paragonie/random_compat=~2.0 first.
+ If you are receiving `undefined offset 0` set the auth class in the env `JUMP_AUTH_USER_MODEL=App\Account\Models\User`