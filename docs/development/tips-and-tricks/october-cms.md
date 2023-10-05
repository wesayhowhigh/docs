---
sidebar_position: 2
sidebar_label: October CMS Tricks
---
# October CMS Tricks

## List Export Character Encoding Issues

If you're using the [OC Import/Export Controller](https://docs.octobercms.com/3.x/extend/importexport/importexport-controller.html) you may notice that it encodes quotes in the CSV.

If you'd like to convert them back, add the following code to a `boot()` method in a Plugin.php

```php
\Event::listen('backend.list.overrideColumnValue', function($list, $record, $column, $value) {
    return html_entity_decode($value, ENT_QUOTES, "utf-8");
});
```

## Add New Plugins to RichEditor (Froala)
Example from Mr LukeTowers himself:
https://github.com/octobercms/october/issues/1743#issuecomment-354133191

Froala Docs:
https://froala.com/wysiwyg-editor/docs/

**Example Froala modification in Living North:**

[JS File](https://github.com/wesayhowhigh/living-north/blob/master/plugins/app/site/assets/js/froala.js)

[Linking the JS file up](https://github.com/wesayhowhigh/living-north/blob/42dc8ad83a037881f06ca7e20d553318df2baa20/plugins/app/site/Plugin.php#L46)

:::note
This might be out of date in current versions of October
:::


## Obfuscate Email Addresses in Twig
You can use the built in html_email helper function to obfuscate an email address in Twig.

```html
<a href="mailto:{{ html_email('email@example.com') | raw }}">
    Email me
</a>
```
