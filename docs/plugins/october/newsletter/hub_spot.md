---
sidebar_position: 3
sidebar_label: HubSpot
---

# HubSpot

## Introduction

The JUMP Newsletter **HubSpot** integration will allow users to subscribe, update and unsubscribe from the
[HubSpot](https://www.hubspot.com) platform.

## Configuration

### Setup
#### Ensure you have an API Key in your env file.
```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=hubspot
HUB_SPOT_API_KEY=a0cae941-lm93-185s-797z-716e34d3065j
HUB_SPOT_TRACKING_CODE=2323214
```

*Optional tracking code can be provided, this will track a users journey through the site. 

Details on how to obtain access keys can be found at: https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key

#### Register the service - config/services.php

```php
'hub_spot' => [
    'key' => env('HUB_SPOT_API_KEY'),
    'tracking' => env('HUB_SPOT_TRACKING_CODE'),
],
```

### Usage
#### Subscribe
##### Custom properties are set up via the HubSpot admin console.
```php
 protected function handleSubmit(ParamBag $params)
    {
        try {
            NewsletterManager::instance()->subscribe([
                'first_name' => $params->get('firstName'),
                'last_name' => $params->get('lastName'),
                'email' => $params->get('email'),
            ]);
        } catch (SubscribeException $e) {
            \Log::error('Subscribe Error from Newsletter', [$e->getMessage()]);

            throw new \Exception('Sorry, there was an error while signing you up to our newsletter. Please try again later');
        }
    }
```

#### Update
##### Custom properties are set up via the HubSpot admin console.
```php
 protected function handleSubmit(ParamBag $params)
    {
        try {
            NewsletterManager::instance()->updateContact([
                'first_name' => $params->get('firstName'),
                'last_name' => $params->get('lastName'),
                'email' => $params->get('email'),
            ]);
        } catch (SubscribeException $e) {
            \Log::error('Update Error from Newsletter', [$e->getMessage()]);

            throw new \Exception('Sorry, there was an error while updating the record. Please try again later');
        }
    }
```

#### Unsubscribe
```php
 protected function handleSubmit(ParamBag $params)
    {
        try {
            NewsletterManager::instance()->unsubscribe([
                'email' => $params->get('email'),
            ]);
        } catch (SubscribeException $e) {
            \Log::error('Unsubscribe Error from Newsletter', [$e->getMessage()]);

            throw new \Exception('Sorry, there was an error while unsubscribing you. Please try again later');
        }
    }
```