---
sidebar_position: 1
sidebar_label: Introduction
---

VVV DELETE FROM HERE
---------------------------------
# Plugin Template File
This file is to be used as a basis for writing a Plugin document for most plugins. If a Plugin is rather large however (example being the OC Pages Plugin) please see the lead developer before starting as the Document may need breaking down into separate pages.

If a section does not apply to the Plugin you are writing for, simply remove that entire section rather than keeping the heading empty.

Remember to use the [Working On Documentation Guide](./development/working-on-documentation) for reference. 

template starts now:
---------------------------------
^^^ TO HERE


# Plugin Name

## Introduction

_Provide a brief, high-level description of what the Plugin does. The plugin_

## Repository

[Github](https://github.com/wesayhowhigh/PLUGIN_NAME)


## Installation

_Provide all necessary steps to get the Plugin installed in a clean October instllation.
This will usually start with `composer require PLUGIN_NAME` but may have additional steps or commands that need running_

## Configuration

_Provide all configuration options for this plugin._

_This usually takes the form of ENV variables - if so remember to use the full features of Markdown to demonstrate:_
```dotenv title=".env"
ENV_EXAMPLE_VARIABLE_1=true
ENV_EXAMPLE_VARIABLE_2=Hello/World
```

## Usage

_Sometimes a Plugin may require an explanation of how to actually use the features that the Plugin provides. Use this section to write those explanations._

_If there are multiple features provided by the plugin, ensure you place a subheading before each explanation. Use 3 hash symbols so the Usage heading can still be seen as the section header._

_As an example:_

### Cool Feature #1 

To use this feature, blah blah blah....

```php
$exampleVariable = new PluginFeature::woop('Awesome');
```

### Cool Feature #2

This feature requires blah blah blah....


## Troubleshooting

_If there are some common *gotchas* surrounding the Plugin you're writing for, write them out here to help future developers._