---
sidebar_position: 2
sidebar_label: Validating the Domain
---

# Validating the Domain

## Step 1

You will likely receive an email with the following information to start the validation process:

A URL to a txt file (That you will be creating shortly)

2 or 3 lines of content to be added to the above file

A Private Key (Block of text that begins with) `-----BEGIN PRIVATE KEY-----`,

## Step 2

Once the plugin is installed, go into the backend then click **Settings > SSL > SSL Challenge**

You then add the following into each input:

Directory - The directory your txt file will be stored in (ie, everything before the TXT file name). In most cases, this will be pki-validation (You needn't include .well-known)

File name - The file name as stated in the email you will have received (eg, somerandomstring.txt)

Challenge text - This is the 2 or 3 lines of content you will have received. Copy and paste it exactly.

Then click submit. If this has worked correctly, you should be able to click on the URL to the txt file in the email and see the 2-3 lines of content on the page.