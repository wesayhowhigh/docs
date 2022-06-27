---
sidebar_position: 1
sidebar_label: HTTP
---

# HTTP Plugin

## Introduction

Manages https responses, redirects & addeds enabled http headers.

## Installation

```bash
composer require jump/oc-http-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-http-plugin)


## Configuration

### Basic Auth config

+ `JUMP_HTTP_AUTH_ENABLED` - Enables or disables basic auth, default false
+ `JUMP_HTTP_AUTH_USERNAME` - Username for basic auth
+ `JUMP_HTTP_AUTH_PASSWORD` - Password for basic password

### HTTPS & Canonical redirect config

+ `JUMP_HTTP_FORCE_HTTPS` - Enables http to https redirect middleware, default false
+ `JUMP_HTTP_FORCE_CANONICAL` - Enables non-www to www canconcial redirect middleware, defaults false
+ `JUMP_HTTP_FORCE_LOWERCASE` - Forces urls to be lowercase, default false
+ `JUMP_REMOVE_TRAILING_SLASH` - Enables removal of trailing slash in urls for consistant canoncial urls, defaults true
+ `JUMP_REMOVE_INDEX_PHP` - Enables middleware to remove '/index.php' in a url and redirect to without, default true

### Security header config

+ `JUMP_HTTP_STRICT_TRANSPORT_SECURITY` - Sets the strict-transport-security header, defaults false
+ `JUMP_HTTP_STRICT_TRANSPORT_SECURITY_INCLUDE_SUBDOMAINS` - Set the HSTS header to include subdomains, default true
+ `JUMP_HTTP_STRICT_TRANSPORT_SECURITY_PRELOAD` - Enables the HSTS preload service, default false
+ `JUMP_HTTP_X_FRAME_OPTIONS_ENABLED` - Sets the x-frame-options header, defaults false
+ `JUMP_HTTP_X_FRAME_OPTIONS` Set the x-frame-options either deny or sameorigin (default)
+ `JUMP_HTTP_X_XSS_PROTECTION` - Sets the x-xss-protection header, defaults false
+ `JUMP_HTTP_X_XSS_PROTECTION_BLOCK` - Enables render block if an xss attack is detected, default true
+ `JUMP_HTTP_X_CONTENT_TYPE_OPTIONS_ENABLED` - Set the x-content-type-options header, defaults false
+ `JUMP_HTTP_REFERRER_POLICY_ENABLED` - Sets the referrer-policy header, defaults false
+ `JUMP_HTTP_REFERRER_POLICY` - Sets the refer policy, default 'no-referrer-when-downgrade'
+ `JUMP_HTTP_CONTENT_SECURITY_POLICY_ENABLED` Sets the content-security-policy header, defaults false

## Usage

### Basic Http Authentication

:::warning
It is strongly recommended setting a strong password when giving clients the details.
:::

To enable basic authentication on the site you must set `JUMP_HTTP_AUTH_ENABLED` to _true_.

A `JUMP_HTTP_AUTH_USERNAME` and `JUMP_HTTP_AUTH_PASSWORD` must be also be set for it to work.

### Forcing Https

To enable the site to always redirect from http to https set `JUMP_HTTP_FORCE_HTTPS` to _true_.

### Forcing Canonical Url

To enable www on the site and to redirect from non-www set `JUMP_HTTP_FORCE_CANONICAL` to _true_.

### Redirects

See [_redirects_](redirects)

### Security headers

See [_security headers_](security-headers)

## Troubleshooting
