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

### Gated Pages
Gated Pages were introduced in [Version 6.1.0](https://github.com/wesayhowhigh/oc-pages-plugin/releases/tag/6.1.0). This feature allows backend users to restrict access to selected pages by placing them behind a form, requiring visitors to submit their details before they can view the page content.

The gating option is available for static pages and can be found under the Page's Settings, beneath the Layout selection. Once enabled, and provided the selected layout includes the required gated form page section, the page will be hidden behind a form. The form itself is managed via the page section within the site.

At the time of writing, this feature is only available for static pages. CMS and dynamic pages are not affected, but they also do not support gated functionality.

When a form is submitted, the user’s details are stored in the Gated Requests plugin for future reference. An optional internal notification email can also be enabled to alert backend users when a submission is received.

#### Gated Request Settings

Gated request notifications can be configured within the Gated Request Settings. Here, you can define the form heading, tagline, and the email addresses that should receive submission notifications. Leave the email field empty if no notifications are required.

#### Setup

##### Step 1 - Create the Gated Request Form PageSection
```htm title="/plugins/app/site/pagesections/gatedrequestform/default.htm"
{% set currentPageId = this.page.apiBag.staticPage.id %}

{% section 'genericHeroPanel' title=this.page.title %}

<section class="c-GatedRequestForm py-res--70" id="{{ self.getId() }}">
    {% if gatedRequestSettings('gatedFormHeading') or gatedRequestSettings('gatedFormTagline') %}
        <div class="mb-11">
            <div class="px-res--main">
                <div class="mw mw--1145">
                    <div class="">
                        {% if gatedRequestSettings('gatedFormHeading') %}
                            <h2 class="text-center mb-4 leading-[1] text-6xl lg:text-7xl xl:text-8xl font-normal font-subheading">
                                {{ gatedRequestSettings('gatedFormHeading') }}
                            </h2>
                        {% endif %}
                        {% if gatedRequestSettings('gatedFormTagline') %}
                            <p class="text-center text-xl">
                                {{ gatedRequestSettings('gatedFormTagline') }}
                            </p>
                        {% endif %}
                    </div>
                </div>
            </div>
        </div>
    {% endif %}

    <div class="px-res--main">
        <div class="mw mw--1145">
            <div>
                <form class="c-Form"
                      data-request="{{ actions.submit }}"
                      data-request-validate
                      data-request-flash
                      data-request-redirect="/">
                    {{ form_token() }}

                    <div class="grid grid-cols-1 gap-x-7 gap-y-10 max-w-[557px] mx-auto">
                        <div class="w-full">
                            {% partial 'form/input'
                                name='name'
                                placeholder='Your name'
                                label='NAME'
                                inputClass='c-Form__input'
                                required=true
                            %}
                        </div>
                        <div class="w-full">
                            {% partial 'form/input'
                                name='company'
                                placeholder='Your company'
                                label='COMPANY'
                                inputClass='c-Form__input'
                                required=true
                            %}
                        </div>
                        <div class="w-full">
                            {% partial 'form/input'
                                name='email'
                                placeholder='Your email address'
                                label='EMAIL'
                                type='email'
                                inputClass='c-Form__input'
                                required=true
                            %}
                        </div>

                        <div>
                            {% partial 'form/checkbox'
                                name='terms'
                                label='I have read and agree to the <a href="https://accordience.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>'
                                required=true
                            %}

                            {% partial 'form/recaptcha' %}

                            <input type="hidden" name="page_id" value="{{ currentPageId }}">
                        </div>

                        <div class="text-center">
                            {% partial 'form/submit'
                                label='SUBMIT'
                            %}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
```

##### Step 2 - Add the Gated Request Action
```yml title="/plugins/app/site/pagesections/gatedrequestform/actions.yml"
submit:
  type: jump_pages_submitGatedRequestForm
  params:
    name: "#name"
    company: "#company"
    email: "#email"
    page_id: '#page_id'
    terms: "#terms"
    g-recaptcha-response: "#g-recaptcha-response"
    successMessage: "Thank you for submitting this form."
```

##### Step 3 - Add conditional to every layout
```htm title="/themes/app/layouts/main.htm"
<main id="main">
    {% component 'commentToolbar' %}

    {% if this.page.gated and not userHasAccessToGatedPage(this.page) %}
        {% section 'gatedRequestForm:main' %}
    {% else %}
        {% page %}
    {% endif %}
</main>
```

##### Step 4 - Add internal confirmation email (if needed)
```htm title="/plugins/app/site/pagesections/gatedrequestform/default.htm"
subject=subject
==
<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
    <tr>
        <td>
            <img src="{{ url('/themes/app/assets/images/logo-red.png') }}" alt="Logo" style="width: 140px; margin: 20px auto 40px;" width="140" />
        </td>
    </tr>
    <tr>
        <td>
            <p>
                Hi there,
            </p>
        </td>
    </tr>
    <tr>
        <td height="5">&nbsp;</td>
    </tr>
    <tr>
        <td>
            <p>
                You received a new gated request submission. See details below.
            </p>
        </td>
    </tr>
    <tr>
        <td height="5">&nbsp;</td>
    </tr>
    <tr>
        <td>
            <p><strong>Name</strong>: {{ name }}</p>
        </td>
    </tr>
    <tr>
        <td>
            <p><strong>Company</strong>: {{ company }}</p>
        </td>
    </tr>
    <tr>
        <td>
            <p><strong>Email address</strong>: {{ email }}</p>
        </td>
    </tr>
    <tr>
        <td>
            <p><strong>Page accessed</strong>: {{ pageTitle }}</p>
        </td>
    </tr>
    <tr>
        <td height="5">&nbsp;</td>
    </tr>
    <tr>
        <td>
            <p>
                Kind regards<br/>
            </p>
        </td>
    </tr>
</table>
```