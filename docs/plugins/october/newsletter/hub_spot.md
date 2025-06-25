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

Ensure you have an API Key in your env file.

```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=hubspot
HUB_SPOT_PRIVATE_APP_ACCESS_TOKEN=pat-eu1-****-****-****-************
HUB_SPOT_TRACKING_CODE=2323214

```

*Optional tracking code can be provided, this will track a users journey through the site. 

Details on how to obtain access keys can be found at: https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key

#### Create Private App

To create a private app in HubSpot and view contacts, you'll need to enable the following scope:

- crm.objects.contacts.read
- crm.objects.contacts.write

> Navigate to Settings > Integrations > Private Apps

Give the app a sensible name, e.g. 'Website', add the necessary scopes and create. A dialog box will appear with your app's access token.

:::warning
Copy this token immediately and store it securely, as HubSpot will not show it again after this step. This token is what you'll use to authenticate your API calls to retrieve contact data.
:::

#### Register the service - config/services.php

```php
'hub_spot' => [
    'private_app_access_token' => env('HUB_SPOT_PRIVATE_APP_ACCESS_TOKEN'),
],
```

### Usage

#### Custom properties

It is recommended to create a custom property in HubSpot and set it to true when a user subscribes to
a newsletter from the website, so that you can track the source of the subscription.

Details on how to add a custom property can be found at: https://knowledge.hubspot.com/properties/create-and-edit-properties

#### Subscribe

Custom properties are set up via the HubSpot admin console.

```php
 protected function handleSubmit(ParamBag $params)
    {
        try {
            NewsletterManager::instance()->subscribe([
                'first_name' => $params->get('firstName'),
                'last_name' => $params->get('lastName'),
                'email' => $params->get('email'),
                'came_from_<site>_website' => true,
            ]);
        } catch (SubscribeException $e) {
            \Log::error('Subscribe Error from Newsletter', [$e->getMessage()]);

            throw new \Exception('Sorry, there was an error while signing you up to our newsletter. Please try again later');
        }
    }
```

#### Update

Custom properties are set up via the HubSpot admin console.

```php
 protected function handleSubmit(ParamBag $params)
    {
        try {
            NewsletterManager::instance()->updateContact([
                'first_name' => $params->get('firstName'),
                'last_name' => $params->get('lastName'),
                'email' => $params->get('email'),
                'came_from_<site>_website' => true,
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