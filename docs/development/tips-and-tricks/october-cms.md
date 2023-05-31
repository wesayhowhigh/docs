---
sidebar_position: 2
sidebar_label: October CMS Tricks
---

# List Export Character Encoding Issues

If you're using the [OC Import/Export Controller](https://docs.octobercms.com/3.x/extend/importexport/importexport-controller.html) you may notice that it encodes quotes in the CSV.

If you'd like to convert them back, add the following code to a `boot()` method in a Plugin.php

```php
\Event::listen('backend.list.overrideColumnValue', function($list, $record, $column, $value) {
    return html_entity_decode($value, ENT_QUOTES, "utf-8");
});
```
