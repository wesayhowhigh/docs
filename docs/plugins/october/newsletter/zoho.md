---
sidebar_position: 4
sidebar_label: Zoho
---

# Zoho

## Introduction

The JUMP Newsletter **Zoho** integration will subscribe users on [Zoho](https://www.zoho.com/) Campaigns.

:::note
You might need to run the php artisan october migration command to ensure that the `jump_newsletter_zoho_tokens` table is created.
:::


## Configuration

### Config setup

#### Register the service - config/services.php

```php
'zoho' => [
    'client_id' => env('ZOHO_CLIENT_ID'),
    'client_secret' => env('ZOHO_CLIENT_SECRET'),
    'list_key' => env('ZOHO_LIST_KEY'),
    'zoho_redirect_uri' => env('ZOHO_REDIRECT_URI'),
],
```

### List ID

#### Zoho Campaign List ID

You will need a campaign list ID where user data will be stored.

1. Go to [Zoho Campaign Lists](https://campaigns.zoho.eu/campaigns/org20087522709/home.do#list/all)
2. Click into required list.
3. Click "Setup" menu option
4. Get your list key and save it as `ZOHO_LIST_KEY` in your .env.

### Authentication

Zoho CRM API uses the OAuth2.0 protocol for authentication.

To make API calls the application must be authenticated with an access token, which is valid for 1 hour. Refresh token then needs to be used 
to get a new access token. However, firstly the application has to be granted access to specific scopes with a temporary authorisation token.

#### Perform one-time authorisation and get client secret 

1. Go to https://api-console.zoho.eu/ and log in
2. Click "Add Client"
3. Select "Self Client"
4. Set Client Name to be your client's name, e.g. "JUMP"
5. Add Homepage URL
6. Add Authorized Redirect URIs, e.g. http://localhost:8000/zoho-callback (this endpoint doesn't need any functionality)
7. Click "Create"
8. Get Client ID and Client Secret from the "Client Secret" tab and save them in your .env file as `ZOHO_CLIENT_ID` and `ZOHO_CLIENT_SECRET`
9. Switch to the "Generate Code" tab
10. Enter the required scope separated by commas, e.g. `ZohoCRM.modules.ALL`. Full list of scopes is available [here](https://www.zoho.com/crm/developer/docs/api/v3/scopes.html).
11. Enter a description (it could describe what the scope covers, e.g. "Modules")
12. Click "Create"
13. Click on "CRM" portal, use the radio box to select your environment
14. Click "Create"
15. Copy the generated code and save it somewhere: you'll need to use it soon

### .env setup

#### Check you have the following values in your .env.
```dotenv title=".env"
JUMP_NEWSLETTER_DRIVER=zoho
ZOHO_CLIENT_ID=1000.VLGM...   # Client ID from Zoho
ZOHO_CLIENT_SECRET=65e13d8... # Client Secret from Zoho
ZOHO_LIST_KEY=3z5014e....     # Campaign List ID from Zoho
ZOHO_REDIRECT_URI=http://...  # Callback URL you provided on Zoho client 
```

### Initialise Zoho

Run php artisan command designed to initialise Zoho:

```bash
php artisan newsletter:initialise-zoho YOUR_TEMPORARY_AUTHORISATION_CODE
```

The first set of tokens will be saved in the `jump_newsletter_zoho_tokens` database table.

### Usage

#### Subscribe

```php
try {
    NewsletterManager::instance()->subscribe([
        'email' => $params->get('email'),
        'list_key' => config('services.zoho.list_key'),
    ]);
} catch (SubscribeException $e) {
    throw new Exception('Sorry, there was an error while signing you up to our newsletter. Please try again later');
}
```

#### Unsubscribe

```php
// TODO :)
```

#### Other Zoho integrations

Zoho provides variety of different services. This particular integration focuses on Zoho Campaigns, but at JUMP
we have Zoho CRM implementation which has been built on wesayhowhigh.com website (wesayhowhigh-2023 GH repo).