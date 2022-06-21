---
sidebar_position: 1
sidebar_label: Analytics
---

# Analytics Plugin

## Introduction

The JUMP Analytics Plugin embed the google tag manager tracking code and gtag/ga functions on your website.

## Installation

```bash
composer require jump/oc-analytics-plugin`
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-analytics-plugin)


## Configuration

To enable tracking on your site add the the following `.env` variables:

+ `JUMP_ANALYTICS_TAG_MANAGER_ID` - Google Tag Manager tracking code
+ `JUMP_ANALYTICS_MEASUREMENT_ID` - Google Analytics G4 Measurment ID (only required for GA4, not UA)

### Example .env file

```
JUMP_ANALYTICS_TAG_MANAGER_ID=GTM-xxxxxxx
JUMP_ANALYTICS_MEASUREMENT_ID=G-xxxxxxxxxx
```

## Usage

The tag manager requires a `script` insert in the head and a `iframe` inserted into the top of the body.

### `script` insert

Placed as high in the `<head>` of the page as possible.

```php
{% if cookie_preferences_check('google-tag-manager') %}

    {{ tag_manager('script') }}

{% endif %}
```

### `iframe` insert

Placed immediately after the opening `<body>` tag.

```php
{% if cookie_preferences_check('google-tag-manager') %}
    {{ tag_manager('iframe') }}
{% endif %}
```

## Enable GA/GTAG event tracking in js

To enable ga event tracking in your `app.js` import the  googleAnalytics.js` JS file into your main JS file.

```js
import googleAnalytics from "../../../../plugins/jump/analytics/assets/js/googleAnalytics";
```

*The measurment ID env is required for this to work for GA4, UA does not require it.*

### Example of button click tracking

#### `fields.yaml`

```yaml
trackOnGoogleAnalytics:
  label: "Track on Google Analytics"
  type: checkbox
  default: 0
  span: left
  trigger:
    action: show
    field: showAction
    condition: checked
gaEventCategory:
  label: "GA Event Category (optional)"
  type: text
  span: left
  trigger:
    action: show
    field: trackOnGoogleAnalytics
    condition: checked
gaEventLabel:
  label: "GA Event Label (optional)"
  type: text
  span: right
  trigger:
    action: show
    field: trackOnGoogleAnalytics
    condition: checked
```

#### `default.htm`

```html
{% set ga = googleAnalyticsEventData(COMPONENT_NAME_GOES_HERE, self.trackOnGoogleAnalytics, self.gaEventCategory, self.gaEventLabel) %}

<some-element {{ ga | default('') }}>Click me</some-element>
```

## Troubleshooting

If tracking is not work check/try the following:

+ Has the jump cookie been accepted, no tracking should be taking place if the cookie policy has not been accepted/allowed (Cookie consent plugin v2 and above)?
+ Has the Tag Manager Tracking & Measurement ID code been added to the env, and a deployment has been triggered since?
+ Does the `app.js` in the theme assets have the imported js from the pluging (see above)?
+ Does the page section have the twig tracking data attributes in the html?
