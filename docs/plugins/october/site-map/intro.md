---
sidebar_position: 1
sidebar_label: Site Map
---

# Site Map Plugin

## Introduction

The sitemap plugin creates an XML sitemap from a menu code.

## Installation

```bash
composer require jump/oc-site-map-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-site-map-plugin)

## Usage

1. In the backend in the pages plugin menus, create a menu called Sitemap (with a code of `sitemap`).
2. Add/uncomment the sitemap route in the site plugin `routes.php` file.

### Example `routes.php` file

```php title="plugins/app/site/routes.php"
<?php

use Jump\SiteMap\Classes\SiteMap;

Route::get('sitemap.xml', function() {
    return SiteMap::generateFromMenu('sitemap') //generate from menu code
        ->toResponse(); //Return XML response
});
```

## Menu Item Generators

Menu item generators will help you create sitemap entries for plugins with slugable urls. It requires the following data to help generate the entry correctly:

+ model
+ title
+ url

### Example

Here is an example menuitemgenerator class for a blog article.

```php title="BlogMenuItemGenerator.php"
<?php

namespace App\Site\MenuItemGenerators;

use Cms\Classes\Theme;
use App\Blog\Models\Article;
use Jump\Pages\Classes\DefaultMenuItemGenerator;

/**
 * Model
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 */
class BlogMenuItemGenerator extends DefaultMenuItemGenerator
{
    /**
     * @return string
     */
    protected function model(): string
    {
        return Article::class;
    }

    /**
     * @param mixed $model
     *
     * @return string
     */
    protected function resolveTitle($model): string
    {
        return $model->title;
    }

    /**
     * @param Theme $theme
     * @param mixed $model
     *
     * @return string
     */
    protected function resolveUrl(Theme $theme, $model): string
    {
        return url('/blog/' . $model->slug);
    }
}
```

## Troubleshooting

+ **Duplicate URLs in the sitemap**: If there are duplicates entries for the first menu item in each menu entry, please update the plugin version to `v2.1.0` (`composer require jump/oc-site-map-plugin:~2.1`)