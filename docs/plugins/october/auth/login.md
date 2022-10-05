---
sidebar_position: 3
sidebar_label: Login
---
# Login

Create the login pagesection in your site project.

## `actions.php`

```yaml
login:
  type: jump_site_login
  params:
    email: '#email'
    password: '#password'
    remember: '#remember'
    successRedirectTo: '/'
```

## Example View

```html
<form name="login" method="post" data-request="{{ actions.login }}" class="c-Form c-Form--boxed" data-request-success="this.reset()" data-request-flash data-request-validate>
    
    {% partial 'form/input' type="email" label="Email" required=true %}

    {% partial 'form/password' showButton=true confirm=false label="Password" required=true %}

    {% partial 'form/checkbox' label="Remember Me" name="remember" %}

    <button type="submit" class="c-Button ">Log In</button>
</form>

<a href="{{ url('forgot-password') }}">Forgot Your Password?</a>
```