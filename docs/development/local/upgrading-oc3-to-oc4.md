---
sidebar_position: 2
sidebar_label: Upgrading to OC4
---

# October CMS v3 → v4 Upgrade Guide

This guide is based on the uncommitted changes from upgrading this project from October CMS v3 to v4.

## Overview

- **Core upgrades**:
    - Laravel 10 → 12
    - OctoberCMS 3.x → 4.x (including `october/rain`, `system`, `backend`, `cms`, `media`, and the new `dashboard` package)
- **PHP Version**: Requires PHP 8.3 (enforced in `composer.json`).
- **Configuration**: Some configuration keys and bootstrap patterns have changed.
- **Templates**: Twig is now stricter, requiring the `| raw` filter for any helper that outputs HTML.

## 1. Composer Changes

**What changed**:
- Framework and October packages were bumped to v4.
- New dependencies (`league/glide`, `league/flysystem`) were added to align with modern filesystem and imaging requirements.
- Several Jump plugins were updated to their next major version to ensure OC4 compatibility.

**Example `composer.json` highlights**:

```json
{
  "require": {
    "php": ">=8.3",
    "laravel/framework": "^12.0",
    "october/rain": "^4.0",
    "october/system": "^4.0",
    "october/backend": "^4.0",
    "october/cms": "^4.0",
    "october/media": "^4.0",
    "october/dashboard": "^4.0",
    "spatie/schema-org": "^3.11",

    "league/glide": "3.0.1 as 2.3.1",
    "league/flysystem": "^3.25.1",
    "league/flysystem-aws-s3-v3": "^3.0",

    "jump/oc-debug-plugin": "^5.0",
    "jump/oc-http-plugin": "^5.0",
    "jump/oc-images-plugin": "^3.0",
    "jump/oc-metadata-plugin": "^6.0",
    "jump/oc-pages-plugin": "^6.0",
    "jump/oc-search-plugin": "^6.0",
    "jump/query": "^5.0",
    "...": "..."
  }
}
```
**Action Items for Jump Package Maintainers**:

- **`league/glide` alias**: The alias `"3.0.1 as 2.3.1"` is a temporary workaround. This indicates some packages require Glide v2 APIs while others need v3. This is due to the recent deprecation of the old Laravel Glide package, forcing us to use Symphony Glide.

## 2. Bootstrap Changes

OC4 adopts the modern Laravel `Application::configure` bootstrap pattern.

- **`bootstrap/app.php`**: This file is now completely different, using a fluent configuration chain.
- **`bootstrap/providers.php`**: This new file is where you should register any custom Service Providers.
- **`bootstrap/autoload.php`**: This has been simplified to just register Composer's autoloader and the compiled services path.

**Action items**:
- If you have custom service providers, add them to `bootstrap/providers.php`.
- If you need to enable web, API, or console routes, uncomment them in the `->withRouting()` section of `bootstrap/app.php`.

## 3. Config Changes

Multiple configuration files have been updated to align with Laravel 12.

- **`config/app.php`**: `asset_url`, `fallback_locale`, and `faker_locale` are now env-driven. Service providers and aliases are no longer listed here; October CMS handles them automatically. Key rotation (`previous_keys`) is now supported.
- **`config/cache.php`**: The default store is now `CACHE_STORE`. Database and Redis drivers have new options for lock connections.
- **`config/cms.php`**: New settings for URL exceptions, template strictness (`strict_variables`), security policies, and more.
- **`config/database.php`**: New `mariadb` connection preset. `migrations` is now an array of options. Redis connections support `username` and `persistent` keys.
- **`config/filesystems.php`**: Disks now support a `report` flag to suppress exceptions.

See here for an example config change:
https://github.com/wesayhowhigh/mallorca-property-concierge/commit/5b07fd747476b7bb02497bdefbf85aa6ec764f19#diff-950397cc5ef29707b54d0c774bd94af85836bab1a27f2f86533d832d25caf224

## 4. Twig/Template Changes

OC4 enforces stricter auto-escaping for security. Any function or component that intentionally outputs HTML must now be piped through the `| raw` filter.

**Examples**:

```twig
{# Renders the cookie consent banner #}
{{ cookie_consent() | raw }}

{# Renders the reCAPTCHA widget #}
{{ recaptcha() | raw }}

{# Renders an inline SVG file #}
{{ rawSvg('themes/app/assets/images/logo.svg') | raw }}
```
**Action Item**:
- Audit all theme partials and CMS pages. Check for any custom helpers or components that output HTML and ensure they use the `| raw` filter.

## 5. New/Changed Environment Variables

Update your `.env.example` and developer `.env` files with these new keys if needed:

- **Cache**: `CACHE_STORE`, `DB_CACHE_CONNECTION`, `DB_CACHE_LOCK_CONNECTION`, `REDIS_CACHE_CONNECTION`
- **Database**: `DB_CHARSET`, `DB_COLLATION`
- **App**: `APP_FALLBACK_LOCALE`, `APP_FAKER_LOCALE`
- **CMS**: `CMS_ROUTE_CACHE`, `CMS_ASSET_CACHE`, `CMS_STRICT_VARIABLES`, `CMS_EXCEPTION_POLICY_V1`
- **Security**: `APP_PREVIOUS_KEYS` (for key rotation)

## 6. Post-Upgrade Checklist

1.  **Composer**: Run `composer update -W` to update all dependencies. Follow with `php artisan optimize:clear`.
2.  **Database**: Run `php artisan october:migrate`.
3.  **Frontend**: Rebuild any frontend assets (e.g., `npm run dev`).
4.  **Smoke Test**:
    - Can you log into the backend?
    - Do media uploads work?
    - Do frontend pages render correctly?
    - Are components that output HTML (SVGs, forms) visible?
    - Do file-system-dependent features (S3 uploads, image resizing) work?


