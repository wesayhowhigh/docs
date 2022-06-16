---
sidebar_position: 1
sidebar_label: Intro
---

# Social Media Plugin

## Introduction

The JUMP Social Media Plugin supports the following social media integrations, **Facebook**, **Instagram** and **Twitter**. 

**Facebook -** Likes

**Instagram -** Instagram posts (Images only)

**Twitter -** Tweets feed


## Installation

Type `composer require jump/oc-social-media-plugin` into your project root terminal.


## Repository

[Github](https://github.com/wesayhowhigh/oc-social-media-plugin)

## Configuration

### Breaking change note

As of v3 of this plugin the twitter config is no longer in config/services.php but inside the Plugin itself.
If you are upgrading, please remove the twitter array from the services config file.

The .env variables used to set the config have not changed and remain the same.
You should not need to update your .env when upgrading.

### Query caching
By default all successful queries are cached to avoid external requests being over used. 

The default is 5 minutes, for October/Laravel < v6 and 300 seconds for v6 or greater. 

This can be overridden in the **env** using JUMP_SOCIAL_MEDIA_CACHE_TIME. 

```dotenv title=".env"
JUMP_SOCIAL_MEDIA_CACHE_TIME=69
```

**Please remember the value in Laravel v6 is now in seconds and not minutes.**


### Try... catch
All queries have had a try...catch wrapped around them to avoid the website erroring when an unsuccessful call to an API endpoint is returned. 
If an API throws an error, a null value will be returned in the query result instead.
