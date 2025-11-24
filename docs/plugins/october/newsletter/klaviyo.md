---
sidebar_position: 3
sidebar_label: Klaviyo
---

# Klaviyo

## Introduction

The JUMP Newsletter Klaviyo integration will allow users to subscribe to a mailing list and segment them based on tags passed with them, all via the [Klaviyo](https://www.klaviyo.com/uk/) platform.

## Configuration

### Setup
#### Ensure you have a List ID and a Private Key in your env file.
```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=klaviyo
KLAVIYO_PRIVATE_KEY=pk_**********************************
KLAVIYO_LIST_ID=AbCdEf
```

Details on how to obtain access keys can be found at: [How to find a list ID](https://help.klaviyo.com/hc/en-us/articles/115005078647) and [How to manage your API Keys](https://help.klaviyo.com/hc/en-us/articles/115005062267)

:::note
You will need to make sure your API Key has the correct access level. You can either set it to be a "Full Access Key" or you can set custom permissions for your API Key. If doing this, make sure you give Full Access to the API scopes: **List**, **Profiles** and **Segments**
:::

#### Register the service - config/services.php
```php
'klaviyo' => [
    'key' => env('KLAVIYO_PRIVATE_KEY'),
    'list_id' => env('KLAVIYO_LIST_ID'),
]
```

### Usage

#### Subscribe

```php
try {
    NewsletterManager::instance()->subscribe([
        'email' => $params->get('email'),
        'first_name' => $params->get('first_name'),
        'last_name' => $params->get('last_name'),
    ]);
} catch (SubscribeException $e) {
    \Log::error('Subscribe Error from Newsletter', [$e->getMessage()]);

    throw new Exception('Sorry, there was an error while signing you up to our newsletter. Please try again later');
}
```

#### Manage Subscriber Tags

```php
try {
    NewsletterManager::instance()->manageSubscriberTags([
        'email' => $params->get('email'),
        'tags' => [
            'Tag 1',
            'Tag 2',
        ],
    ]);
} catch (SubscribeException $e) {
    \Log::error('Subscriber Tag Error from Newsletter', [$e->getMessage()]);

    throw new Exception('Sorry, there was an error while assigning tags to this subscriber. Please try again later');
}
```
The above will assign the passed tags to the subscribed email address. This would be called after the profile gets created in the above step.

In Klaviyo, this will add the tags as **custom properties** attached to the **profile**. Then, if this is a new tag, it will also create a new **segment** where all email addresses that are assigned this tag will be stored.

You can read more about this at [Understanding custom profile properties](https://help.klaviyo.com/hc/en-us/articles/115000250912) and [Getting started with segments](https://help.klaviyo.com/hc/en-us/articles/115005237908).

:::note
Unlike MailChimp, email addresses that already exist in a list / used to be in a list, will not return an error upon signing up again. They will just be updated with the new data.
:::
:::note
If a tag has been added to a profile previously, it will simply tag the new user and put them into the existing segment.
:::

