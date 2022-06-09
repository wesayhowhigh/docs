---
sidebar_position: 1
sidebar_label: Debug
---

# Debug Plugin

## Introduction

The JUMP Debug Plugin provides [Sentry](https://sentry.io/welcome/) and [DebugBar](https://github.com/barryvdh/laravel-debugbar) integration with your October application.

The plugin also supplied a custom `ExceptionHandler` used to determine what should be sent to Sentry or not. It includes the additional handling of HTTP Status 410 (Gone) pages and Model Not Found Exceptions.

This ExceptionHandler is already registered if you have forked your project from our [Base October Image](https://github.com/wesayhowhigh/base/). See the [bootstrap/app.php file](https://github.com/wesayhowhigh/base/blob/b7e7b0864b9d8bba1764d32d39917ed4d22da37f/bootstrap/app.php#L41) for reference.


## Installation

Type `composer require jump/oc-debug-plugin` into your project root terminal.

## Repository

[Github](https://github.com/wesayhowhigh/oc-debug-plugin)

## Configuration

### Debug Bar
To enable the Debug Bar ensure Debug Mode is on:
```dotenv title=".env"
APP_DEBUG=true
```


Ensure the Debug Bar itself is enabled:
```dotenv title=".env"
DEBUGBAR_ENABLED=true
```
And finally, ensure you are logged into the backend of the October CMS.

### Sentry

Ensure you have created a Project on the [Sentry Website](https://sentry.io).

Proceed to the Project Settings and find the DSN Client Key (Currently at `SDK Setup > Client Keys(DSN) > DSN`).

Paste this value in your .env file:
```dotenv title=".env"
SENTRY_DSN=https://example-dsn-value.ingest.sentry.io/example
```

Then simply throw an error in your project and check the Sentry website has received it.