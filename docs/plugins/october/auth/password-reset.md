---
sidebar_position: 5
sidebar_label: Password Reset
---
# Password Reset

The password reset consists of two parts; emailing the reset link and setting the new password using the link.

## Email Password Link

### `actions.php`

```yaml
forgot:
  type: app_users_sendPasswordResetEmail
  params:
    email: '#email'
    redirectWithSuccess: '/'
    failureMessage: 'There was a problem sending the email. Try again later.'
    successMessage: 'Instruction on resetting your password has been emailed to you.'

```

### Example View

```html
<form id="forgor-password-form" class="c-Form c-Form--boxed" name="password" method="post" data-request="{{ actions.forgot }}" data-request-success="this.reset()" data-request-validate data-request-flash>
    {% partial 'form/input' type="email" label="Email" required=true %}


    <button class="c-Button" type="submit">Send Password Reset Link</button>
</form>

<a href="{{ url('login') }}">Remebered your login?</a>
```

### Reset Password Email

[See Password Reset Email View](model#password-reset-email-view)

## Password Reset Form

### `actions.php`

```yaml
reset:
  type: jump_auth_resetPassword
  params:
    token: '?token'
    email: '#email'
    password: '#password'
    password_confirmation: '#password_confirmation'
    successRedirectTo: '/'
    successMessage: 'You have successfully set your password'
```

### Example View

```html
<form id="password-form" class="c-Form c-Form--boxed" name="password" method="post" data-request="{{ actions.reset }}" data-request-success="this.reset()" data-request-validate data-request-flash>
    {% partial 'form/input' type="email" label="Email" required=true %}

    {% partial 'form/password' showButton=true confirm=true label="Password" required=true %}

    <button class="c-Button" type="submit">Update</button>
</form>
```