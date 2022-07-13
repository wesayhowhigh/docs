---
sidebar_position: 1
sidebar_label: Intro
---

# Images Plugin

## Introduction

The JUMP Images Plugin allows you to manipulate images that have been uploaded through our CMS.

## Installation

Type `composer require jump/oc-images-plugin` into your project root terminal.

## Repository

[Github](https://github.com/wesayhowhigh/oc-images-plugin)

## Setup

If you want to secure your images when you render them through Glide, generate a random 128+ character string and add the following to your ```.env```

```dotenv title=".env"
JUMP_IMAGES_SIGN_KEY=YOUR_GENERATED_KEY
```

## Usage

### Glide

When pulling images into your twig files from the **Pages Plugin**, you can manipulate them however you see fit by applying one of the Images Plugin's **markup tags**.

For standard image formats such as ```jpg``` or ```png```, simply add the ```| glide()``` markup tag to the image source. This will use [The PHP League's Glide library](https://glide.thephpleague.com/) to manipulate how your images look when the page is loaded in the browser.

```htm title='your-twig-file.htm'
<img src="{{ self.image | glide({w:'300',h:'300',fit:'crop'}) }}" alt="...">
```

You would then simply pass your selected [manipulators](/plugins/october/images/manipulators) to change how the image is rendered on the page.

:::caution Deprecation Warning
You may some older sites using the ```| media_glide()``` markup tag. This has since been deprecated. You should use ```| glide()``` instead. 
:::

:::info
When a ```gif```, a transparent ```png``` or an ```svg``` is passed to ```| glide()``` it bypasses the Glide pipeline altogether. Originally Glide kicked up a stink about these formats but this has since been remedied as of **version 1.5.0** and **version 1.6.0**.
:::

### SVG

If you wish to render an uploaded SVG inline within the code, you would use the ```| svg``` markup tag. 

This will take the image from the media plugin, and render the SVG code directly into the page inline.

So, for example:

```htm title='your-twig-file.htm'
{{ self.image | svg }}
```

would be rendered in the browser as:

```htm title='your-twig-file.htm'
<svg width="400" height="110">
  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
</svg>
```