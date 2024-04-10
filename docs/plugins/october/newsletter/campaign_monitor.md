---
sidebar_position: 2
sidebar_label: Campaign Monitor
---

# Campaign Monitor

## Introduction

The JUMP Newsletter **Campaign Monitor** integration will allow users to subscribe and unsubscribe from the
[Campaign Monitor](https://www.campaignmonitor.com) platform.

## Configuration

### Setup
Ensure you have a List ID and API Key in your env file.
```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=campaign_monitor
CAMPAIGN_MONITOR_LIST_ID=3d475lk97k4876d76v3e990322a5345vb
CAMPAIGN_MONITOR_API_KEY=89232vb23379a2bde26dnde7f0m1e30d0ma02ecjjc5ad6d9
```

Details on how to obtain List ID and API key can be found at: https://help.campaignmonitor.com/api-keys

#### Register the service - config/services.php

```php
 'campaign_monitor' => [
    'list_id' => env('CAMPAIGN_MONITOR_LIST_ID'),
    'auth' => [
        'api_key' => env('CAMPAIGN_MONITOR_API_KEY')
    ],
]
```

### Usage
#### Subscribe
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
