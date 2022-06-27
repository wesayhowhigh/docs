---
sidebar_position: 2
sidebar_label: Redirects
---

# HTTP - Redirects

There are two methods of utilising the Redirect functionality: A Database method and an Interface method.

## Database Redirects

- After install you should see a Redirects menu item in the backend
- Click the **New Redirect** button and fill in the *From URL* and *To URL* fields (*leaving out the domain name and leading slash*)
- Choose the Status code for the redirect
- Save - that's it done!

### Importing

You can import a CSV list of URLs if you desire.

- CSV should have **from**, **to** and **status code** column data (they don't need to be *named* that, you just need that data in the file)
- Remove existing site domain name and leading slash from any urls (e.g. *http://www.mywebsite.com/test* becomes */test*)
- Ensure there are only redirects - no 200 OK codes or 403 Forbidden codes (not yet anyway - 403s may be coming in a later version)

## Interface Redirects - for Plugins

You can specify dynamic redirects in your plugins.

For example, redirecting */venues/:slug* to */events/:slug*

1. Create a new Class in your plugin folder that implements `Jump\Http\Classes\Redirect`. 
2. Implementing that interface will give you two method stubs to implement:
3. `canPerform(Request) -> bool` - returns a boolean stating whether the current request path should be acted upon or not.
4. `perform(Request) -> redirect()` - returns a redirect() url, complete with status code
5. In your Plugin's **Plugin.php** file's *boot()* method, return an instance of *Jump\Http\Classes\RedirectManager* and append() or prepend() a newed up instance of your new redirect class
6. Test it out!

### Example Interface Implementation

For our example we'll redirect */venues/:slug* to */events/:slug*

 1. Create *VenuesRedirect* class and implement *Redirect*'s interface methods:

```php
use Jump\Http\Classes\Redirect;

class VenuesRedirect implements Redirect {

    public function canPerform(Request $request)
    {
            
    }
    
    public function perform(Request $request)
    {
        
    }
}
```

 2. We want to check the request path for the *venues/* text in the canPerform() method:

```php
public function canPerform(Request $request)
{
     return strpos($request->path(), 'venues/') === 0;    
}
```

 3. We then want to perform the redirect in the perform() method:

```php
public function perform(Request $request)
{
    $path = str_replace('venues/', 'events/', $request->path());

    return redirect($path, 301);
}
```

 4. In our Plugin's **Plugin.php** file we add:

```php
public function boot()
{
    RedirectManager::instance()->append(new VenuesRedirect());
}
```
