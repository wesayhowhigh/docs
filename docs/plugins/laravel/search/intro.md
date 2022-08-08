---
sidebar_position: 1
sidebar_label: Search
---

# Search

## Introduction

The JUMP Search Library plugin adds search support for different search drivers.

## Installation

```bash
composer require jump/search
```

## Repository

[Github](https://github.com/wesayhowhigh/search)

## Configuration

For the plugin to work, you will need to specify what search driver you want to use.

```dotenv title=".env"
JUMP_SEARCH_DRIVER=selected_driver
```

View how to define various search driver options [here](/plugins/october/search/intro#see-examples-below-of-how-to-set-different-driver-types).

## Drivers

### MySQL Driver

MySQL driver provides quick search using data stored in the database.

#### Setup

##### Select your MySQL driver

Declare the driver in your `.env` file.

```dotenv title=".env"
JUMP_SEARCH_DRIVER=mysql
```

##### Set up your search providers

Once you know which Eloquent models you want to be able to search, use `EloquentProvider` class to create your search providers.

On the Site plugin, create `search` directory, where your providers will live.

Create your search provider and use `EloquentProvider` to extend it.

```php title="my-site/plugins/app/site/search/BlogSearchProvider.php"
class BlogSearchProvider extends EloquentProvider
```

Specify which model you want to target in the `getModelClass()` method.

```php title="my-site/plugins/app/site/search/BlogSearchProvider.php"
/**
 * @return string
 */
protected function getModelClass(): string
{
    return Article::class;
}
```

Define your searchable attributes in the `getAttributesForIndex()` method.

```php title="my-site/plugins/app/site/search/BlogSearchProvider.php"
/**
 * @param mixed $model
 * @param string $index
 *
 * @return array
 */
protected function getAttributesForIndex($model, $index): array
{
    return [
        'title' => $model->title,
        'description' => $model->description, 
        'content' => $model->content,
    ];
}
```

Specify what this provider will be called in the `getType()` method. You will be able to use it when running the import command.

```php title="my-site/plugins/app/site/search/BlogSearchProvider.php"
/**
 * @return string
 */
public function getType(): string
{
    return 'App.Blog.Article';
}
```

Define what index this model will belong to on the `jump_search_index` table:

```php title="my-site/plugins/app/site/search/BlogSearchProvider.php"
/**
 * @return string[]
 */
public function getIndexes(): array
{
    return ['main.index'];
}
```

### Algolia Driver

Algolia driver provides efficient, flexible and insightful search. It's really quick, takes search relevance into account and is highly configurable.

#### Setup

##### Connect your app to Algolia

Create Algolia account and set up your application. Add your application keys to the .env file:

```dotenv title=".env"
JUMP_SEARCH_ALGOLIA_APPLICATION_ID=XXXXXX
JUMP_SEARCH_ALGOLIA_API_KEY=XXXXXXXXXXXXXXXXXX
JUMP_READ_ONLY_ALGOLIA_API_KEY=XXXXXXXXXXXXXXXXXX
```

##### Set up your search providers

Once you know which Eloquent models you want to be able to search, use `EloquentProvider` class to create your search providers.

On the Site plugin, create `search` directory, where your providers will live.

Create your search provider and use `EloquentProvider` to extend it.

```php title="my-site/plugins/app/site/search/ArticleProvider.php"
class ArticleProvider extends EloquentProvider
```

Specify which model you want to target in the `getModelClass()` method.

```php title="my-site/plugins/app/site/search/ArticleProvider.php"
/**
 * @return string
 */
protected function getModelClass(): string
{
    return Article::class;
}
```

Define your searchable attributes in the `getAttributesForIndex()` method.

```php title="my-site/plugins/app/site/search/ArticleProvider.php"
/**
 * @param mixed $model
 * @param string $index
 *
 * @return array
 */
protected function getAttributesForIndex($model, $index): array
{
    return [
        'title' => $model->title,
        'sub_title' => $model->sub_title,
        'introduction' => $model->introduction,
        'slug' => $model->slug,
        'category' => $model->category->name,
        'published' => $model->published,
        'publish_date' => $model->publish_date->format('Y-m-d'),
        'image' => $model->image,
    ];
}
```

Specify what this provider will be called in the `getType()` method. You will be able to use it when running the import command.

```php title="my-site/plugins/app/site/search/ArticleProvider.php"
/**
 * @return string
 */
public function getType(): string
{
    return 'App.Articles.Article';
}
```

Define what this index will be called on Algolia:

```php title="my-site/plugins/app/site/search/ArticleProvider.php"
/**
 * @return string[]
 */
public function getIndexes(): array
{
    return [app()->environment() . '_articles'];
}
```

:::tip
Specify the **environment** on your Index name (`app()->environment()`) to ensure test and live data is always separated.
:::

#### Import data

Use the import command to import the index data on your Algolia application. In the terminal, on your project root run:

```bash
php artisan search:import App.Articles.Article
```

If for whatever reason you need to flush data on Algolia application, use the reset command:

```bash
php artisan search:reset
```

:::danger
Please note, the reset command will flush all your Algolia indices (on the current environment if you specified 
the environment in your index `getType()` method).
:::

### TNT Driver

:::danger
Using the TNT Driver will trigger your first written warning. Jokes! The TNT Driver is now deprecated.
:::

### Elastic Search Driver

:::danger
The Elastic Driver is now deprecated.
:::

## Console commands

The Search plugin providers two commands: Import and Reset.

### Import command

The import command runs the `insertMany` method on the selected search driver.

#### Command
```bash
php artisan search:import
```

You can optionally specify your search provider as a first parameter in the command:

```bash
php artisan search:import App.Articles.Article 
```

### Reset command

The reset command runs the `deleteIndexes` method on the selected search driver.

#### Command
```bash
php artisan search:reset
```