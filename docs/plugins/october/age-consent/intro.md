---
sidebar_position: 1
sidebar_label: Age Consent
---

# Age Consent Plugin

## Introduction

The **Age Consent Plugin** provides a fullscreen modal on top of the view with the following message - "Are you over the age of 18?". Modal and message is dismissed once you click yes and confirm.

Saves an `age_consent` Cookie to the user's browser.

Can be toggled on/off with `JUMP_AGE_CONSENT_ENABLED` env variable - default is true.

## Installation

Type `composer require jump/oc-age-consent-plugin` into your project root terminal.

## Repository

[Github](https://github.com/wesayhowhigh/oc-age-consent-plugin)

## Usage

`.env`
```dotenv title=".env"
JUMP_AGE_CONSENT_ENABLED=true
```

`scripts.htm`
```php
<script src="{{ 'app' | bundle('js') }}"></script>
{{ age_consent() }}
```

## Customisation

CSS can be overridden using the classes found in `/views/age-consent.htm`

If you'd like to override the entire view, create `/views/age-consent.htm` file in your `plugins/app/site/` directory and it will use this instead. 

Base it on the default template below and ensure it has at least:

`{% if show_cookie %}` check wrapping it.

Parent element has `data-control="ageConsent"` attribute.

OK button has `data-control="ageConsent_button_agree"` attribute.

```php
{% if show_cookie %}

    <div class="c-AgeConsent" data-control="ageConsent">

        <div class="c-AgeConsent__wrap">

            <div class="c-AgeConsent__message">
                {{ cookie_body | raw }}
            </div>

            <button class="c-AgeConsent__button c-AgeConsent__button__agree" data-control="ageConsent_button_agree">
                {{ cookie_button_text_agree }}
            </button>

        </div>

    </div>

{% endif %}
```