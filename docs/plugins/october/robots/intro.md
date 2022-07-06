---
sidebar_position: 1
sidebar_label: Intro
---

# Robots Plugin

## Introduction

The JUMP Robots Plugin tells search engine crawlers which URLs the crawler can access on your site. This is used mainly to avoid overloading your site with requests, it is not a mechanism for keeping a web page out of Google. To keep a web page out of Google, block indexing with noindex or password-protect the page with the [JUMP HTTP plugin](/plugins/october/http/intro).

## Installation

Type `composer require jump/oc-robots-plugin` into your project root terminal.

## Configuration

### Setup

To edit the robots.txt file, once the JUMP Robots Plugin is installed, navigate to settings > robots plugin via the CMS.

Alternatively you can use the following URL and replace 'site-name' with your domain.

https://www.site-name.com/backend/system/settings/update/jump/robots/location

## Repository

[Github](https://github.com/wesayhowhigh/oc-robots-plugin)

## Usage

Example of robots.txt file to **Allow** the full website to be crawled.

```txt
User-agent: *
Disallow: 
```

Example of robots.txt file to **Block** the full website from being crawled.

```txt
User-agent: *
Disallow: /
```

Example of robots.txt file to **Allow** the full website to be crawled but **Block** certain URL's.

```txt
User-agent: *
Disallow: /test-url-1
Disallow: /test-url-2
Disallow: /test-url-3
```
