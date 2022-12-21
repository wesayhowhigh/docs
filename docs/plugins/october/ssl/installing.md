---
sidebar_position: 3
sidebar_label: Installing the SSL
---

# Installing the SSL

Once the Validating the Domain step has been done (Or if you have only received the three keys and therefore don't need to do the Validating the Domain step), you will go on to receive a new email that contains two new bits of information:

**The SSL Certificate** - A long piece of text that begins with `-----BEGIN CERTIFICATE-----`

**The SSL Certificate Chain** - A longer piece of text that also begins with `-----BEGIN CERTIFICATE-----` but is multiple certificate strings in one block

Go to Certificate Manager in AWS and make sure you are in the N. Virginia (us-east-1) region, as Cloudfront is located there.