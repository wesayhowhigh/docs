---
sidebar_position: 1
sidebar_label: Intro
---

# Newsletter Plugin

The JUMP Newsletter Plugin supports the following providers, **Campaign Monitor**, **HubSpot**, **Klaviyo**, **Mailchimp** and **Zoho**.

## Installation

The plugin is not included within the base repo, so if required it will need to be installed manually.

```bash
composer require jump/oc-newsletter-plugin
```

## Configuration

### Setup

#### Example of how to set different driver types for the supported providers. 

##### Campaign Monitor 

```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=campaign_monitor
```

##### HubSpot

```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=hubspot
```

##### Klaviyo

```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=klaviyo
```

##### Mailchimp

```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=mailchimp
```

##### Zoho

```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=zoho
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-newsletter-plugin)
