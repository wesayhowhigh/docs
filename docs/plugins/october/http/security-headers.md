---
sidebar_position: 8
sidebar_label: Security Headers
---

# HTTP - Security Headers

:::info
A useful tool to check a websites secuirty headers, [securityheaders.com](https://securityheaders.com/?q=wesayhowhigh.com&hide=on&followRedirects=on)
:::

## Strict Transport Security

The HTTP Strict-Transport-Security response header (often abbreviated as HSTS) lets a web site tell browsers that it should only be accessed using HTTPS, instead of using HTTP.

`JUMP_HTTP_STRICT_TRANSPORT_SECURITY=true|31536000`

The time, in seconds, that the browser should remember that a site is only to be accessed using HTTPS. If set to true, 3153600 (365d) is used, if false the header is not set.

`JUMP_HTTP_STRICT_TRANSPORT_SECURITY_INCLUDE_SUBDOMAINS=true`

If this optional parameter is specified, this rule applies to all of the site's subdomains as well.

`JUMP_HTTP_STRICT_TRANSPORT_SECURITY_PRELOAD=false`

Google maintains an HSTS preload service. By following the guidelines and successfully submitting your domain, browsers will never connect to your domain using an insecure connection. While the service is hosted by Google, all browsers have stated an intent to use (or actually started using) the preload list. However, it is not part of the HSTS specification and should not be treated as official.

```dotenv title=.env
JUMP_HTTP_STRICT_TRANSPORT_SECURITY=true
JUMP_HTTP_STRICT_TRANSPORT_SECURITY_INCLUDE_SUBDOMAINS=true
JUMP_HTTP_STRICT_TRANSPORT_SECURITY_PRELOAD=false
```

## X Frame Options

The X-Frame-Options HTTP response header can be used to indicate whether or not a browser should be allowed to render a page in a `<frame>`, `<iframe>` or `<object>`. Sites can use this to avoid clickjacking attacks, by ensuring that their content is not embedded into other sites.

`JUMP_HTTP_X_FRAME_OPTIONS_ENABLED=true|false`

`JUMP_HTTP_X_FRAME_OPTIONS=deny|sameorigin`

+ deny - the page cannot be displayed in a frame, regardless of the site attempting to do so
+ sameorigin - the page can only be displayed in a frame on the same origin as the page itself allow-from uri - this option is currently not supprted in all major browsers!

```dotenv title=.env
JUMP_HTTP_X_FRAME_OPTIONS_ENABLED=true
JUMP_HTTP_X_FRAME_OPTIONS=sameorigin
```

## X XSS Protection

The HTTP X-XSS-Protection response header is a feature that stops pages from loading when
they detect reflected cross-site scripting (XSS) attacks.

`JUMP_HTTP_X_FRAME_OPTIONS=true|false`

Enabled/Disables XSS filtering

`JUMP_HTTP_X_FRAME_OPTIONS_BLOCK=true|false`

Enables XSS filtering. Rather than sanitizing the page, the browser will prevent rendering of the page if an attack is detected

```dotenv title=.env
JUMP_HTTP_X_FRAME_OPTIONS=true
JUMP_HTTP_X_FRAME_OPTIONS_BLOCK=true
```

## X Content Type Options

When enabled with "nosniff" the script and stylesheet elements will reject responses with incorrect Multipurpose Internet Mail Extensions (MIME) types, thus limiting exposure to downloads and the risk of uploaded content that could be treated as executable or dynamic HTML files.

`JUMP_HTTP_X_CONTENT_TYPE_OPTIONS_ENABLED=true|false`

Enables/disabled the header

```dotenv title=.env
JUMP_HTTP_X_CONTENT_TYPE_OPTIONS_ENABLED=true
```

## Referrer Policy

The Referrer-Policy HTTP header governs which referrer information, sent in the Referer header, should be included with requests made.

`JUMP_HTTP_REFERRER_POLICY_ENABLED=true|false`

`JUMP_HTTP_REFERRER_POLICY=no-referrer-when-downgrade`

More information on the options available at: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy#Examples>

```dotenv title=.env
JUMP_HTTP_REFERRER_POLICY_ENABLED=true
JUMP_HTTP_REFERRER_POLICY=no-referrer-when-downgrade
```

## Content Security Policy

The HTTP Content-Security-Policy response header allows web site administrators to control resources the user agent is allowed to load for a given page. With a few exceptions, policies mostly involve specifying server origins and script endpoints. This helps guard against cross-site scripting attacks (XSS). CSP requires careful tuning and precise definition of the policy, misconfiguration of this may block style and scripts loading on the website.

`JUMP_HTTP_CONTENT_SECURITY_POLICY_ENABLED=true|false`

`JUMP_HTTP_CONTENT_SECURITY_POLICY=upgrade-insecure-requests`

More configuration options can be found at: <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy>

```dotenv title=.env
JUMP_HTTP_REFERRER_POLICY_ENABLED=true
JUMP_HTTP_REFERRER_POLICY=no-referrer-when-downgrade
```
