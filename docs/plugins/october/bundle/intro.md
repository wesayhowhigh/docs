---
sidebar_position: 1
sidebar_label: Bundle
---

# Bundle Plugin

:::caution

The Bundle Plugin is legacy for old October < 1.1 Sites. You should use [Mix Plugin](/plugins/october/mix/intro) instead.

:::

## Introduction



## Installation

```bash
composer require jump/oc-bundle-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-bundle-plugin)

## Configuration

### Webpack config file

```js title="webpack.config.js"
const october = require('@jump/bundle/october');

module.exports = october({
  theme: 'app',
  dir: __dirname,
});
```

### Styles in the JavaScript

The css must be imported into the js directly, at the top of the main js file.

```js title="themes/app/assets/js/app.js"
import '../css/app.css';
```

### Node version 8

For bundle node version 8 is the requirement. You can both/either upgrade nmv and docker:

1. To update your nvm version, set your `.nvmrc` file to `v8` - make sure you `nvm install v8` and/or `nvm use`
2. To update your docker node service in your `docker-compose.yml` to:

```yml title="docker-compose.yml"
node:
image: node:8
volumes:
    - ./:/var/www/html:delegated
    - ${HOME}/.npmrc:/root/.npmrc
```

## Usage

### Render Javascript

By default, Mix will render a Manifest file, a Vendor file (all of your dependencies) and an app file (your actual project code).

So you'll now need to render these separately.

```html title="themes/app/partials/scripts.htm"
<script src="{{ 'app' | bundle('js') }}"></script>

{% framework extras %}
```

### Render CSS

```html  title="themes/app/partials/meta.htm"
<link rel="stylesheet" href="{{ 'app' | bundle('css') }}">
```

## Troubleshooting

+ If on a deployment you recieve an npm build error regarding camelcase pacakge, add the following to your package.json dependencies: `npm i "assets-webpack-plugin":"3.9.12"`. Then commit and re-deploy.
