---
sidebar_position: 1
sidebar_label: Pages - Intro
---


# Pages Plugin

## Introduction

The **Pages plugin** controls Static Pages, Menus and Dynamic Page Wrappers.

## Installation

The plugin is included within the base repo, so it doesn't need to be installed manually.

```bash
composer require jump/oc-pages-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-pages-plugin)

## Available functionality

### Dynamic Page Wrappers

Dynamic Page Wrappers were introduced in [Version 5.5.0](https://github.com/wesayhowhigh/oc-pages-plugin/releases/tag/5.5.0).
This feature gives limited Dynamic Page control to backend users (like Metadata control), without losing Dynamic Page functionality
in the codebase.

Though some pages that would normally be dynamic can be made static (e.g., list page with no filter functionality that would affect the URL),
it is recommended to always use Dynamic Page Wrappers instead.

Please note that Dynamic Page Wrappers are only applicable to pages that should be partially managed in the backend, e.g., list pages.
Pages like blog detail page should remain in the codebase only.

#### Setup

##### Step 1 – Create your dynamic page file

```htm title="/themes/app/pages/blog-post-list.htm"
title = "Blog"
url = "/blog/:category?"
is_hidden = 0
layout = "main"
==
```

##### Step 2 – Register dynamic page in the Site Plugin

```php title="/plugins/app/site/Plugin.php"
/**
 * @return string[]
 */
public function registerDynamicPages(): array
{
    return [
        DynamicPages\BlogPostList::class => 'blog-post-list',
    ];
}
```

##### Step 3 – Create dynamic page class in DynamicPages directory and declare public property `editable` set to true 

```php title="/plugins/app/site/dynamicpages/BlogPostList.php"
class BlogPostList extends DynamicPage
{
    /**
     * @var bool
     */
    public $editable = true;

    /**
     * @return void
     */
    public function boot()
    {
        // Additional logic.
    }
}
```

##### Step 4 – Run a command to generate Dynamic Page Wrapper record.

```bash
php artisan pages:create-dynamic-page-wrappers
```

This will create any missing dynamic page wrapper records in `jump_pages_dynamic_page_wrappers` table,
that have the `$editable` property set to true (it is false by default).

Each dynamic page wrapper record will have:
- Title (automatically generated dynamic page pretty name)
- Dynamic page name (the name of your dynamic page, e.g., 'blog-post-list')
- Content (empty by default)
- Timestamps

##### Step 5 – Find your dynamic page wrapper records in the backend.

Go to Pages plugin and click on the "Dynamic Pages" submenu link. This will redirect you to
the Dynamic Page Wrappers list with all the created records.

On each record admin can set page title, content and metadata.

##### Step 6 – Add `dynamicPageSections` section to your dynamic page htm file to render the page sections selected in the backend.

Make sure to specify the `pageName` value – this should be the name of the dynamic page.

```htm title="/themes/app/pages/blog-post-list.htm"
title = "Blog"
url = "/blog/:category?"
is_hidden = 0
layout = "main"
==
{% section 'dynamicPageSections' pageName='blog-post-list' %}
```

This will render the content defined on Dynamic Page Wrapper record in the backend.

##### Step 7 – Access DynamicPageWrapper record in your DynamicPage class to access any required data.

Use `getDynamicPageWrapperRecord()` method to retrieve Dynamic Page Wrapper record.

```php title="/plugins/app/site/dynamicpages/BlogPostList.php"
class BlogPostList extends DynamicPage
{
    /**
     * @var bool
     */
    public $editable = true;

    /**
     * @return void
     */
    public function boot()
    {
        if ($dynamicPage = $this->getDynamicPageWrapperRecord('blog-post-list')) {
            $this->addOverride('pageTitle:main', function (OperationMap $queries) use ($dynamicPage) {
                return Overrides::make()
                    ->withValue('title', $dynamicPage->title);
            });

            $this->addMetaDataFrom($dynamicPage);
        }
    }
}
```