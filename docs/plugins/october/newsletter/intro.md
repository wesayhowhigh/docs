---
sidebar_position: 1
sidebar_label: Intro
---

# Newsletter Plugin

The JUMP Newsletter Plugin supports the following providers, **Campaign Monitor**, **HubSpot** and **Mailchimp**.

## Installation

Type `composer require jump/oc-newsletter-plugin` into your project root terminal.

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

##### Mailchimp
```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=mailchimp
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-social-media-plugin)
