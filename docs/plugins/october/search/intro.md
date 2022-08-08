---
sidebar_position: 1
sidebar_label: Search
---

# Search Plugin

## Introduction

The Search plugin adds search support on an October site.

## Installation

```bash
composer require jump/oc-search-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-search-plugin)

## Configuration

### Setup

#### 
Upon installation, you need to select your search driver. We currently support:
- MySQL
- Algolia
- TNT
- Elastic
####

:::info
In order for the selected search driver to work, you will also need to install JUMP search library plugin:

```bash
composer require jump/search
```

Read more about the JUMP search library plugin [here](/plugins/laravel/search/intro).
:::

#### See examples below explaining how to set different driver types.

#### MySQL Driver (default)

```dotenv title=".env"
JUMP_SEARCH_DRIVER=mysql
```

#### Algolia Driver

```dotenv title=".env"
JUMP_SEARCH_DRIVER=algolia
JUMP_SEARCH_ALGOLIA_APPLICATION_ID=XXXXXX
JUMP_SEARCH_ALGOLIA_API_KEY=XXXXXXXXXXXXXXXXXX
JUMP_READ_ONLY_ALGOLIA_API_KEY=XXXXXXXXXXXXXXXXXX
```

#### TNT Driver

```dotenv title=".env"
JUMP_SEARCH_DRIVER=tnt
```

#### Elastic Search Driver

```dotenv title=".env"
JUMP_SEARCH_DRIVER=elastic_search
JUMP_SEARCH_ELASTIC_SEARCH_HOST=XXXXXX
JUMP_SEARCH_ELASTIC_SEARCH_PREFIX=XXXXXXXXXXXXXXXXXX
```

## Usage

### MySQL Driver (default)

Read more about how to use the MySQL Driver [here](/plugins/laravel/search/intro#mysql-driver).

### Algolia Driver

Read more about how to use the Algolia Driver [here](/plugins/laravel/search/intro#algolia-driver).

### TNT Driver

Read more about how to use the TNT Driver [here](/plugins/laravel/search/intro#tnt-driver).

### Elastic Search Driver

Read more about how to use the Elastic Search Driver [here](/plugins/laravel/search/intro#elastic-search-driver).
