---
sidebar_position: 4
sidebar_label: Logout
---
# Logout

Create the logout pagesection in your site project or include it in another for example the header.

## `actions.php`

```yaml
logout:
  type: jump_site_logout
  params:
    successRedirectTo: '/login'
```

## Example View

```html
{% if ctx.authenticated %}
<form class="c-Form" data-request="{{ actions.logout }}" data-request-validate data-request-flash method="post">
    {{ form_token() }}

    <button class="c-Button" type="submit">Log out</button>
</form>
{% else %}
<a href="{{ url('login') }}" class="c-Button">Log In</a>
{% endif %}
```

### Page Section with Context

```php
use Auth;
use Jump\Pages\Classes\Context;
use Jump\Pages\Classes\Environment;

...

/**
 * @inheritdoc
 */
protected function prepareContext(Context $ctx, Environment $env)
{
    $authChecked = Auth::guard()->check();

    $ctx->set('authenticated', $authChecked);
}
```