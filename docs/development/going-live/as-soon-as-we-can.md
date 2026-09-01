---
sidebar_position: 2
sidebar_label: As soon as we can
title: As soon as we can
---
:::info Customise this page!
Entering your site details below will swap out placeholders in the code blocks live, saving you from find-and-replacing variables when copying commands into your terminal.

<VarInput name="DOMAIN" label="Domain" defaultValue="newsite.com" />
:::

---
There are few things you can do prior to go-live to give you less busy work to do on the day. It also gives you an opportunity to gain access to the DNS (or become chummy with whoever will be handling the DNS for you) prior to the big day.

## DNS Records - Set 1
### PostMark
Firstly, create your [server](https://account.postmarkapp.com/servers/new) if you have not already. Then, you will need to add the **domain** to the [sender signatures](https://account.postmarkapp.com/signatures/add) in order to send from it.

Simply add the domain of your new site ("**<Var name="DOMAIN" default="newsite.com" />"**, without the wwws) and you will be presented with the DNS records you will need to add to verify the domain for sending.

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

### API Key

As of September 2026, you can find your API Key in the [API area of your account](https://us14.admin.mailchimp.com/account/api/).

Once you generate your key, you will need to add it to your `.env` file under `MAILCHIMP_API_KEY=*****`. (Make sure `JUMP_NEWSLETTER_DRIVER=mailchimp` too!)