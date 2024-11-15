---
sidebar_position: 1
sidebar_label: Intro
---

# HTTP Plugin

## Introduction

The JUMP HTTP Plugin has the following features.

+ **[Basic Auth](basic-authentication)** - This is a simple implementation of middleware basic HTTP authentication. 

+ **[Force Canonical](force-canonical)** - Forces the website to enable www and to redirect from non-www.

+ **[Force HTTPS](force-https)** - Forces the website to always redirect from http to https.

+ **[Force Lowercase](force-lowercase)** - Forces the website to have a lowercase URL structure.

+ **[Remove Trailing Slash](remove-trailing-slash)** - Removes the trailing slash from the site.

+ **[Redirects](redirects)** - HTTP Redirects handled both at a Database and Interface level.  

+ **[Security Headers](security-headers)** - A series of HTTP headers middleware to improve website security.

+ **[Remove `index.php`](remove-index-php)** - Middleware to remove index.php and redirect.

+ **[IP Whitelisting](ip-whitelisting)** - Block access to websites except for whitelisted IPs

## Installation

```bash
composer require jump/oc-http-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-http-plugin)

## Troubleshooting

### Basic Auth not working?

If basic auth credentials modal keeps popping up on every page request, ensure you have added the `Authorization` header to the Whitelist in the CloudFront distribution