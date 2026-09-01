---
sidebar_position: 2
sidebar_label: As soon as we can
---
# As soon as we can
There are few things you can do prior to go-live to give you less busy work to do on the day. It also gives you an opportunity to gain access to the DNS (or become chummy with whoever will be handling the DNS for you) prior to the big day.

## DNS Records - Set 1
### PostMark
Firstly, create your [server](https://account.postmarkapp.com/servers/new) if you have not already. Then, you will need to add the **domain** to the [sender signatures](https://account.postmarkapp.com/signatures/add) in order to send from it.

Simply add the domain of your new site (without the wwws) and you will be presented with the DNS records you will need to add to verify the domain for sending.

You will typically be given a `._domainkey` **TXT record**, and a `pm-bounces` **CNAME**.

**Keep a hold of these for later.**

### Certificate
We already have an excellent [guide to installing a certificate](https://docs.wesayhowhigh.dev/development/infrastructure/ssl/installing#requesting-a-free-amazon-certificate), so refer to that to get yourself set up.

**Keep a hold of the the resulting CNAMEs for the next step.**

### Setting the DNS Records
#### If you are managing them
Simply add PostMark's TXT record and CNAME record, and the certificate CNAMEs you received from the previous steps
#### If they are managing them
You will need to pass on the DNS records to them, for them to add themselves:

:::info While not required, this format works well!
**For Postmark (1/2)**

**Hostname**  
20260730134710pm._domainkey

**Type**  
TXT

**Value**  
k=rsa;p=MIGfMA.....
:::

#### Either way, once they are added
You will potentially need to wait for the DNS records to propagate. This can take up to 48 hours, but typically takes around 10 minutes.

You can trigger a recheck of the records inside both Postmark and Certificate Manager to give it a kick, if required

## MailChimp
If the site will be using MailChimp, this is a good opportunity to make sure that is all up and running.

[Create a new account](https://login.mailchimp.com/signup/) or obtain login details for the existing one from the client.

You will need two keys from MailChimp for your `.env` file.

### Your API Key and Audience ID

As of September 2026, you can find and/or generate your API Key in the [API area of your account](https://us14.admin.mailchimp.com/account/api/).

Then, you will need to go to the mailing list (audience) you will be posting to, and get the audience ID. You can get this by click on your audience, then clicking on the three dots next to "Connect Shopify" and selecting "Audience Settings". The Audience ID is listed there.

You will then need to add the following to your `.env`

```.dotenv
JUMP_NEWSLETTER_DRIVER=mailchimp
MAILCHIMP_API_KEY=**YOUR_API_KEY**
MAILCHIMP_AUDIENCE_ID=**YOUR_AUDIENCE_ID**
```

## MapBox
Not included with every site, but it's important you have your MapBox API key in place, and ready for the new site, should you need it.

As you will have likely already created a site in MapBox for your local site, make sure that your live domain is one of the URLs assigned to your **token**. You can do this by clicking the three dots on your token, scrolling to the list of URLs at the bottom and saving your changes.

## ReCAPTCHA
Similar to MapBox, you can also add your live domain to the ReCAPTCHA settings early.

If you go to your reCAPTCHA property and click the cog, you can add your domain to the list of those that are allowed to use your registration.

You may have already done this to use this key locally and on staging, so your live domain just needs to be added for when you go live.

## Site Backlog Gotchas
This is also a good opportunity to make sure the site backlog is up to date, and there's nothing that could be a blocker on go live day.

It's always worth checking the current state of the backlog, but here's a few that can be missed:

* **Schemas:** Make sure you have all the relevant Schemas in place. Your home page should have the default **Organization Schema**, and if you have detail pages where this would be helpful, make sure they are added and working
* **Error/Maintenance Pages:** Make sure you have the relevant content in place for the following pages:
  * 404, Page Not Found
  * 410, Page No Longer Exists
  * 500, Internal Server Error
  * Maintenance Mode (important, as this will be used on go live day)
  * Cookie and Privacy Policies (make sure the standard default JUMP content is in place for both, if it is not being written up bespoke for this site)
  * Cookie Preferences (make sure this is styled correctly as per your design)
* **Social Media Sharing Image:** Make sure the default sharing image for every page is as per your design (obviously not including detail pages with sensible alternates)