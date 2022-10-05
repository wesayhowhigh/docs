---
sidebar_position: 2
sidebar_label: Model
---
# User Model

The User Model must be created in the project, it is not shipped with the plugin. The Model can be created in any plugin of your project, the choice depends on the project and your coding style. It can always be added to a User Plugin if you find it does not fit into any specific plugin.

## Example migration

```php
<?php namespace App\Users\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableCreateAppUsersUsers extends Migration
{
    public function up()
    {
        Schema::create('app_users_users', function($table)
        {
            $table->engine = 'InnoDB';
            $table->increments('id')->unsigned();
            $table->string('name');
            $table->string('email');
            $table->string('password');
            $table->string('remember_token')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('app_users_users');
    }
}
```

## Implements

```php
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

...

class User extends Model implements AuthorizableContract, AuthenticatableContract, CanResetPasswordContract
```

## Required traits & methods

```php
use Illuminate\Auth\Authenticatable;
use October\Rain\Database\Traits\Hashable;
use Illuminate\Foundation\Auth\Access\Authorizable;

...

class User...

    use Hashable;

    use Authorizable;

    use Authenticatable;

    /**
     * @var array List of attributes to hash.
     */
    protected $hashable = [
        'password',
    ];

    /**
     * Get the e-mail address where password reset links are sent.
     *
     * @return string
     */
    public function getEmailForPasswordReset()
    {
        return $this->email;
    }

    /**
     * Send the password reset notification.
     *
     * @param  string $token
     *
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        Mail::send('app.users::mail.reset-password', [
            'url' => config('app.url') . '/reset-password?token=' . $token,
        ], function (Message $message) {
            $message->to($this->getEmailForPasswordReset());
            $message->subject(config('mail.from.name') . ' Set Password Link');
            $message->from(config('mail.from.address'), config('mail.from.name'));
        });
    }
```

## Password Reset Email View

```html
subject="Password Reset Link"
==
You are receiving this email because we received a password reset request for your account.

{{ url }}

If you did not request a password reset, no further action is required.

==

<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
    <tr>
        <td>
            <p>You are receiving this email because we received a password reset request for your account.</p>
        </td>
    </tr>
    <tr>
        <td><p><a href="{{ url }}">Click here to reset your password</a></p></td>
    </tr>
    <tr>
        <td><p>If you did not request a password reset, no further action is required.</p></td>
    </tr>
</table>

```
