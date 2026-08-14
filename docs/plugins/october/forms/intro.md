---
sidebar_position: 1
sidebar_label: Forms
---
# Feeds Plugin

## Introduction
The forms plugin allows you to build custom forms through OctoberCMS for use within October projects.

It builds upon [Renatio's Form Builder Plugin](https://octobercms.com/plugin/renatio-formbuilder) and extends it with additional features.

## Installation
This plugin is not currently included within the base repo. So, if required, it will need to firstly be installed manually.

To begin with, though, make sure that the octobercms repository in your composer.json has the following "only" filtering rule added:

```json title='composer.json'
"octobercms": {
  "type": "composer",
  "url": "https://gateway.octobercms.com",
  "only": [
    "october/*",
    "*-plugin",
    "*-theme"
  ]
}
```

This allows the paid Renatio Plugin to be installed from the gateway.

Then, simply install the plugin:

```bash
composer require jump/oc-forms-plugin
```

Once required, you need to make sure the migrations are ran, bringing the relevant tables into your database.

```bash
php artisan october:migrate
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-forms-plugin)


## Getting Started

### Publishing Assets

#### Herd

In the root of the project run

```bash
herd php artisan vendor:publish --tag=form-builder-assets
```

This will copy the assets into your themes/css folder.

Then add the new file to your app.css

```css title='app.css'
@import "components/FormBuilder.css";
```

## Backend Usage

### Forms
When creating a form, most of the options are self-explanatory. Take note, however, of the following:

#### Mail Template
You can select any saved mail template here, but it will autotmatically default to "Default Mail Template".

This is the one you will want in 99% of cases, as it takes your based email styling, and simply loops through your fields to render a familiar looking email.

#### Fields

The "name" is the HTML name attribute. We disable spaces by default and would usually be snake case.

#### Email Destinations

- "Recipients" are the internal email addresses that the form will be sent to.
- "Reply To" sets the replyto of these sent emails based on the selected field
- "Autoresponder" sends a copy of the internal email to the sender, based on the selected field

#### Options

There are a couple of the switches to turn off and on the saving of submissions to the database. If on, you will see all submissions come through to the Form Logs area.

### Form Fields

There is a simple suite of form fields included in the migration. Others can be added if necessary, but these basics will cover the majority of forms you'll build.

:::info
We also include a recaptcha field that is heavily based upon JUMP's existing recaptcha integration. It should work as it does for the existing base recaptcha.htm field.
:::

### Form Logs
If you choose to save them, all of the form submissions get saved to the database. You can then see them in this area. 

The records include the sending details and the contents of the email sent.

## Example Front End Usage

Firstly, create your Page Section:

```htm title='plugins/app/site/pagesections/yourpagesection/default.htm'
<div id="{{ self.getId() }}" class="o-Container">
    {% ajaxPartial 'formbuilder/form' formCode=self.formCode %}
</div>
```

```yml title='plugins/app/site/pagesections/yourpagesection/fields.yml'
formCode:
  label: Form
  modelClass: Renatio\FormBuilder\Models\Form
  type: select
  multi: false
  labelFrom: name
  idFrom: code
```

And then, create your forms ajaxPartial, this will bring the form into the page section itself:

```htm title='themes/app/partials/formbuilder/form.htm'
description = 'Form Builder Form Panel'

[renderForm dynamicForm]
formCode = "{{ formCode }}"
==
<div class="c-FormBuilder">
    {% component 'dynamicForm' %}
</div>
```

You should then be good to go 💪

## Troubleshooting
