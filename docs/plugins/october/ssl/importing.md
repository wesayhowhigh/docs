---
sidebar_position: 4
sidebar_label: Importing a Certificate
---

# Importing a Certificate

If you are importing the first certificate for your domain (or replacing an Amazon issued one) click **Import**.

You then add the following into each input:

**Certificate body** - The block of text beginning with `-----BEGIN CERTIFICATE-----`

**Certificate private key** - The block of text beginning with `-----BEGIN CERTIFICATE-----`

**Certificate chain** - The block of text beginning with `-----BEGIN CERTIFICATE-----` that is a chain of multiple certificate text blocks connected together

You'll then be asked to add your tag. As you did throughout the site creation process, set the tag key to **BillingName** and the value to **site-{{ your-site-name }}**.

Then click **Import** to import your certificate.

Once this is done, you will need to update the **Cloudformation Stack** for your domain with the new **SSL ARN ID**, so it references your new certificate.

Copy the ID from your new certificate and paste it into the Cloudformation Stack and update. Once the build is complete, you should be able to view your new certification by clicking the padlock next to the URL in Chrome and selecting Connection is secure > Certificate is valid