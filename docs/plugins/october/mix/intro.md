---
sidebar_position: 1
sidebar_label: Mix
---

# Mix Plugin

## Introduction

Adds Jump Mix support to October sites and compiles the assets for the October project using [Laravel Mix](https://laravel-mix.com/). Please read this guide fully - if you're coming from `base` then most of this will already be set up for you. But it's still recommended to read this fully.

## Installation

```bash
composer require jump/oc-mix-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-mix-plugin)


## Configuration

If you are upgrading from bundle (previous assets bundler) then complete the following steps:

1. Make sure you've removed bundle (`jump/oc-bundle-plugin`) from your package.json

2. Update Node to v12, v12 is now the minimum requirement (up from v8). You can both/either upgrade nmv and docker:
   1. To update your nvm version, set your `.nvmrc` file to `v12` - make sure you `nvm install v12` and/or `nvm use`
   2. To update your docker node service in your `docker-compose.yml` to:

    ```yml title="docker-compose.yml"
    node:
    image: node:12
    volumes:
        - ./:/var/www/html:delegated
        - ${HOME}/.npmrc:/root/.npmrc
    ```

3. Remove the importing of `app.css` from within your `app.js` - they're now separated.

4. You can also remove the `{% framework %}` or `{% framework extras %}` tags from your layouts/partials

    Instead, you can now add the following to the top of your `app.js` file:

    ```js
    import framework from '../../../../modules/system/assets/js/framework.combined-min';
    ```

    And at the following to the top of your `app.css` file:

    ```js
    @import "../../../../modules/system/assets/css/framework.extras-min.css";
    ```

5. If you experience any build errors, delete your node_modules folder, package-lock.json and re-run npm install

## Usage

### The Mix Webpack config

You should have a `webpack.mix.js` file in the root of your project with the following contents:

```js title="webpack.mix.js"
const mix = require('@jump/mix');

mix({
   vue: false,
   tailwind: true
});
```

First arg inside `mix()` is an object for enabling Tailwind and Vue support
Second argument is an optional callback for adding onto the internal Laravel Mix process:

```js title="webpack.mix.js"
const mix = require('@jump/mix');

mix({
   vue: false,
   tailwind: true
}, (internalMix) => {
    internalMix.webpackConfig({
       // some sort of webpack overrides
    })
});
```

### The Tailwind config

You should have a `tailwind.config.js` file in the root of your proeject with the following contents:

```js title="tailwind.config.js"
module.exports = {
  mode: 'jit',
  purge: [
    './themes/app/assets/js/*.vue',
    './themes/app/assets/js/*.js',
    './themes/app/content/*.htm',
    './themes/app/layouts/*.htm',
    './themes/app/pages/*.htm',
    './themes/app/partials/*.htm',
    './plugins/app/**/*.htm',
    './plugins/jump/**/*.htm',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

### Updated package.json scripts

The `package.json` scripts can be simplified as follows:

```json title="package.json"
"scripts": {
    "dev": "mix",
    "watch": "mix watch",
    "watch-poll": "mix watch -- --watch-options-poll=1000",
    "hot": "mix watch --hot",
    "build": "mix --production",
}
```

### Render Javascript

By default, Mix will render a Manifest file, a Vendor file (all of your dependencies) and an app file (your actual project code).

So you'll now need to render these separately.

```html title="themes/app/partials/scripts.htm"
<script src="{{ 'manifest' | mix('js') }}"></script>
<script src="{{ 'vendor' | mix('js') }}"></script>
<script src="{{ 'app' | mix('js') }}"></script>
```


### Render CSS

```html  title="themes/app/partials/meta.htm"
<link rel="stylesheet" href="{{ 'app' | mix('css') }}">
```

### Using Tailwind CSS

Add to the __end__ of your `app.css` file:

```css title="themes/app/assets/css/app.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Troubleshooting

+ If you are having trouble compiling assets after updating from bundle to mix, remove the `package-lock.json` and `node_modules` then re-import, using either `./dev npm i` or `nvm i && nvm use && npm i`