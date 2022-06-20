---
sidebar_position: 3
sidebar_label: Mailchimp
---

# Mailchimp

## Introduction

The JUMP Newsletter **Mailchimp** integration will all users to subscribe and unsubscribe from the
[Mailchimp](https://mailchimp.com/en-gb/) platform.

## Configuration

### Setup
#### Ensure you have an Audience/List ID and API Key in your env file.
```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=mailchimp
MAILCHIMP_API_KEY=23b7m8i94s04cga9988128b6kb15e420-us1
MAILCHIMP_AUDIENCE_ID=jbjblvfe456969
```

Details on how to obtain access keys can be found at: https://mailchimp.com/en-gb/help/find-audience-id/ and https://support.checkfront.com/hc/en-us/articles/115004180154-Introduction-to-Mailchimp-and-API-Keys

#### Register the service - config/services.php

```php
'mail_chimp' => [
    'key' => env('MAILCHIMP_API_KEY'),
    'list_id' => env('MAILCHIMP_AUDIENCE_ID')
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
                'list_id' => config('services.mail_chimp.list_id')
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