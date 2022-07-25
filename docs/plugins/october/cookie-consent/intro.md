---
sidebar_position: 1
sidebar_label: Cookie Consent
---

# Cookie Consent Plugin

## Introduction

The cookie consent plugin asks the user for permission on what cookies they wish to allow or disallow on a site.

## Installation

```bash
composer require jump/oc-cookie-consent-plugin`
```

If you're upgrading an older project, in your site config directory add, `cookie.php` and paste the contents below:

```php title="/config/cookie.php"
<?php

return [
    'unencryptedCookies' => [
        'jump_cookie_consent',
    ],
];
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-cookie-consent-plugin)

## Getting Started

### Publishing Plugin Assets

Inside your docker container, `docker-compose exec app sh`, run

```bash
php artisan vendor:publish --tag=cookie-assets
```

with `--force` if necessary

### Styles

In your app.css

```css
@import "components/CookieConsent";
@import "components/CookiePreferences";
```

Then customise your cookie css custom properties to match your sites theme.

```css
--cookie-preferences-radio: #ddd;
--cookie-preferences-radio-dot: #fff;
--cookie-preferences-radio-hover: #ccc;
--cookie-preferences-radio-primary: #06c;

--cookie-consent-border: #000;
--cookie-consent-background: #fff;
--cookie-consent-text-on-background: #000;
```

### Create the preferences page

In the pages plugin section create a new page with the suggested url 'cookie-preferences' and include the cookie preferences page section and save.

## Usage

For cookie perfence types that are optional, any scripts, snippets or markup that will create or use the specific cookie should be wrapped in an if statment to check if the user has accepted or denied that cookie in their preferences.

### Example for Analytics Cookie

```php
{% if cookie_preferences_check('google-tag-manager') %}

    {{ tag_manager('script') }}

{% endif %}
```

## Cookie Preference Types

### October Session Cookie

By default the October session cookie type is registered automatically with the plugin as a required cookie type, as all sites will require this.

### Analytics Cookie(s)

If the [analytics plugin](https://docs.jump-ops.com/plugins/october/analytics/intro) is installed on your this will register analytics as an optional cookie usage.

:::info
If a cookie usage can be overwritten and set to required or optional from its default state if a site depends on it. This is done in the backend settings interface.
:::

### Create a cookie type

To create additional cookie perferences on a site for users to customise there experience you can regsiter cookie types in your app.

:::info
This will need to be registered in the `Plugin.php` in the `registerCookies()` function.
:::

The easiest way is to use the `create:cookie` command but the files can be made manually if you wish.

```**bash**
php artisan create:cookie App.Site ExampleCookieType
```

This will generate a file in the cookies directory of the plugin.

```php
<?php

namespace App\Site\Cookies;

use Jump\CookieConsent\Classes\CookieBase;

/**
 *
 */
class ExampleCookieType extends CookieBase
{
    /**
     * @inheritdoc
     */
    public function cookieDetails()
    {
        return [
            'name' => 'ExampleCookieType',
            'description' => 'No description provided yet...',
            'preference' => self::OPTIONAL,
            'editable' => true,
        ];
    }
}
```

The options for preference are `REQUIRED` or `OPTIONAL` (default). If a cookie type is required the user cannot opt out of its usage due to its critical business requirement.

Each cookie type will be listed on the cookie preferences page so users can customise their experience and choose which cookies to allow or deny.

:::info
Remember to wrap any scripts, iframes etc. that use this new cookie in an if `cookie_preferences_check`, so it is not ran before accepting or denying.
:::

## Troubleshooting

+ If you receive an error when viewing the cookie preferences page the first time, be sure to go to the cookie consent settings and do the initial save. `/backend/system/settings/update/jump/cookieconsent/settings#primarytab-consent-popup`
+ If the cookie popup is showing on every page after it has been dismissed or accepted, check the config/cookie.php file of the site has the cookie listed as unencrypted so the JavaScript can read it.

```php
    'unencryptedCookies' => [
        'jump_cookie_consent',
    ],
```
