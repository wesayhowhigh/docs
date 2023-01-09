---
sidebar_position: 1
sidebar_label: SSL
---

# SSL Plugin

## Introduction

The SSL plugin is used to update SSL certificates that require File Authentication to validate the domain.

## Installation

```bash
composer require jump/oc-ssl-plugin
```

## Repository

[Github](https://github.com/wesayhowhigh/oc-ssl-plugin)

## Usage


### Step 1: Validating the domain

You will likely receive an email with the following information to start the validation process:

* A URL to a txt file (that you will be creating shortly)
* 2 or 3 lines of content to be added to the above file
* A Private Key (a block of text that begins with -----BEGIN PRIVATE KEY-----). If you don't get that, check with the lead dev – it might be stored somewhere else (e.g. files shared within the team).

Firstly, make sure that the SSL plugin has been installed into your project. If it's not there, you can install it by running:

```bash
composer require jump/oc-ssl-plugin
```

Once installed, go into the backend then click `Settings > SSL > SSL Challenge`

Add the following into each input:

* Directory - The directory your txt file will be stored in (ie, everything before the TXT file name). In most cases, this will be `pki-validation` (You needn't include `.well-known`)
* File name - The file name as stated in the email you will have received (eg, `somerandomstring.txt`)
* Challenge text - This is the 2 or 3 lines of content you will have received. Copy and paste it **exactly**.

Click submit. If this has worked correctly, you should be able to click on the URL to the txt file in the email and see the 2-3 lines of content on the page.

:::tip
You might be asked for the SSL Challenge URL to not redirect to HTTPS for the validation to work, but 99% of the time you don't need to
do anything and it works fine as it is.
:::

### Step 2: Installing the SSL
Once the above step has been done (or if you have only received the three keys and therefore don't need to do the above step), you will go on to receive a new email that contains two new bits of information:

* The SSL Certificate (a long piece of text that begins with -----BEGIN CERTIFICATE-----)
* The SSL Key (a long piece of text that begins with -----BEGIN PRIVATE KEY-----)
* The SSL Certificate Chain (a longer piece of text that also begins with -----BEGIN CERTIFICATE-----, but is multiple certificate strings in one block)

Go to Certificate Manager in AWS and make sure you are in the N. Virginia (us-east-1) region, as Cloudfront is located there.

### Importing a Certificate
If you are importing the first certificate for your domain (or replacing an Amazon issued one) click **Import**

Add the following into each input:

* Certificate body - The block of text beginning with -----BEGIN-CERTIFICATE-----
* Certificate private key - The block of text beginning with -----BEGIN PRIVATE KEY-----
* Certificate chain - The block of text beginning with -----BEGIN-CERTIFICATE----- that is a chain of multiple certificate text blocks connected together

You'll then be asked to add your tag. As you did throughout the site creation process, set the tag key to `BillingName` and the value to `site-{{ your-site-name }}`

Then click **Import** to import your certificate.

Once this is done, you will need to update the Cloudformation Stack for your domain with the new SSL ARN ID, so it references your new certificate.

Copy the ID from your new certificate and paste it into the Cloudformation Stack and update. Once the build is complete, you should be able to view your new certification by clicking the padlock next to the URL in Chrome and selecting **Connection is secure > Certificate is valid**

### Reimporting a Certificate

If you are renewing an existing certificate, find your domain and click into it. Then click **Reimport**.

Add the following into each input:

* Certificate body - The block of text beginning with -----BEGIN-CERTIFICATE-----
* Certificate private key - The block of text beginning with -----BEGIN PRIVATE KEY-----
* Certificate chain - The block of text beginning with -----BEGIN-CERTIFICATE----- that is a chain of multiple certificate text blocks connected together

Click **Next** and complete the process.

Give it a few minutes to propagate, and if all is successful you should be able to view your new certification by clicking the padlock next to the URL in Chrome and selecting **Connection is secure > Certificate is valid**

## Troubleshooting

Your manager may ask for the SSL Challenge URL to not redirect to HTTPS for the validation to work. However, ask them to use the URL as it is. 99% of the time you don't need to
do anything and it works fine as it is.