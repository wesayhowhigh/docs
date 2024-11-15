---
sidebar_position: 11
sidebar_label: IP Whitelisting
---

# HTTP - IP Whitelisting

Added in [Version 4.3.0](https://github.com/wesayhowhigh/oc-http-plugin/releases/tag/4.3.0), you can activate a feature to block the entire website except for specific IP addresses.

This feature was developed and currently used on the [Thomas Graham project](https://github.com/wesayhowhigh/thomas-graham).

## Using the feature

There is an ENV Variable `JUMP_HTTP_RESTRICT_TO_IP_ADDRESS_ENABLED=false` or the feature can be enabled by going to the **Backend Settings** > **System** > **Ip Restrictions** and ticking the "Enabled switch"

There is a list for managing the list of IP addresses once the switch has been enabled.

:::warning
Remember to set your own IP address is the list before Saving!
:::

## Accessing the website if you've not been whitelisted

If you're locked out, not working in the JUMP office (our office static IP should **always** be added to the list) and need to get into the backend then follow the steps:

1. Connect directly to the database
2. Look in the System settings table `system_settings`
3. Look for the row with `item` equal to `jump_backend_ip_restriction_settings`
4. Expand its JSON field called `value`
5. Inside you'll see similar to`"ip_addresses":[{"ip_address":"51.XX.XX.XXX"},{"ip_address":"51.XX.XX.XXX"}]`
6. Simply add an additional key of `id_address` with a value of your actual IP address to the `ip_addresses` array
7. Save the row
8. You'll likely need to clear the cache, as October caches system settings.
9. To do that, SSH onto the Lightsail, SSH onto the App Docker container and run `php artisan cache:clear`
10. You should now have access to the backend of the website