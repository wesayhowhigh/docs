---
sidebar_position: 1
sidebar_label: Preview
---

# Preview Plugin

## Introduction

The **Preview plugin** provides ability to preview unpublished records in the frontend.

## Installation

The plugin is not included within the base repo, so if required it will need to be installed manually.

```bash
composer require jump/oc-preview-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-preview-plugin)

## Configuration

The Preview plugin needs to be configured on every Model that can be previewed. 

:::warning
It will only work on Models that have an additional rule / condition that must be met before the record is rendered in the frontend, e.g., `published` boolean.  
:::

### Model Setup

#### 1. Use `Previewable` interface

Use interface on the Model to get it ready for the preview functionality.

```php
<?php 

namespace App\Plugin\Models;

use Model;
use Jump\Preview\Contracts\Previewable;

class YourModel extends Model implements Previewable
{
    ...
}
```

#### 2. Use `HasPreview` trait

Add this trait to get default logic for every `Previewable` interface but one... see step 3!

```php
<?php 

namespace App\Plugin\Models;

use Model;
use Jump\Preview\Contracts\Previewable;
use Jump\Preview\Traits\HasPreview;

class YourModel extends Model implements Previewable
{
    use HasPreview;
    ...
}
```

#### 3. Set up missing method(s)

Add logic for missing methods. By default, it should be just `getFullPathForPreviewUrl()` method missing. 
This function should provide full path that preview plugin to use when generating preview URL.

```php
<?php 

namespace App\Plugin\Models;

use Model;
use Jump\Preview\Contracts\Previewable;
use Jump\Preview\Traits\HasPreview;

class YourModel extends Model implements Previewable
{
    use HasPreview;
    
    /**
     * @inheritDoc
     */
    public function getFullPathForPreviewUrl(): string
    {
        return '/article/' . $this->slug;
    }
}
```

#### 4. Update frontend detail page queries

[Read more about this here.](/plugins/october/preview/intro#how-do-we-view-it-in-the-frontend)

### How it works?
 
Once Preview plugin is wired to a Model, all its records that shouldn't be available
to the general public yet can be previewed when a generated token is added in the URL.

#### How to generate the preview token?

When a Save event is triggered on a Model, the Preview plugin will call `previewShouldBeCreated()` method to determine if it 
should generate a preview token for the record. By default, this method checks for `published_at` and `published` 
column values on a model. If it appears that the record isn't published yet, a preview token will be generated 
in `jump_preview_previews` table.

:::tip
If the default columns aren't applicable to your Model, adjust the logic by overriding `previewShouldBeCreated()` on
your Model.
:::

#### For how long can a record be previewed?

If a preview token gets generated, it will have an optional expiry date (null by default). That depends if the model has a `published_at` date 
(or a similar value than you can specify by overriding `getPreviewExpiryDate()` method). If it does, the plugin will use 
that value for the `expired_at` column. 

If set, after the `expired_at` timestamp passes, the preview functionality will no longer be available.
The token value will automatically be removed from the URL in `PreviewTokenMiddleware` and user will be redirected to the identical URL without it.

#### Where can user find the preview token?

If you access a recently saved record form in the backend that can be previewed, you will see a new "Preview" tab.
In the tab, there will be a Preview URL field with full URL provided that you can copy using the `copy` icon.

#### How to view it in the frontend?

To get preview working in the frontend, you will need to update Model's detail page query, e.g. `GetArticleBySlug`

Replace your `published()` scope (or similar that is applicable to your Model), with `allowsPreviews()`, e.g.:

```php
return Article::allowsPreviews()
    ->where('slug', $params->get('slug'))
    ->firstOrFail();
```

`allowsPreviews()` scope checks if item is published (i.e. already meets the criteria to be viewable), or if it can be previewed.

:::warning
By default, Preview plugin assumes that a Previewable model has a `published()` scope. That's what it will check to determine
if the item is already viewable. If this isn't applicable to your model, pass correct scope name to `allowPreviews()` method, e.g.:

```php
return Article::allowsPreviews('isAvailable')
    ->where('slug', $params->get('slug'))
    ->firstOrFail();
```
:::


## Do not index preview pages

It's very important that the preview URLs are not indexed in the frontend.

To ensure that the page is not indexed and served to users in Google Search results, add `isPreviewPage` check on
your `meta.htm` partial like this:

```html
{% if this.page.meta_prevent_crawling or isPreviewPage() %}
    <meta name="robots" content="noindex">
{% endif %}
```