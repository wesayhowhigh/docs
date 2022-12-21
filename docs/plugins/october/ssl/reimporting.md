---
sidebar_position: 5
sidebar_label: Reimporting a Certificate
---

# Reimporting a Certificate

If you are renewing an existing certificate, find your domain and click into it. Then click **Reimport**.

You then add the following into each input:

**Certificate body** - The block of text beginning with `-----BEGIN CERTIFICATE-----`

**Certificate private key** - The block of text beginning with `-----BEGIN CERTIFICATE-----`

**Certificate chain** - The block of text beginning with `-----BEGIN CERTIFICATE-----` that is a chain of multiple certificate text blocks connected together

Then click Next and complete the process.

Give it a few minutes to propagate, and if all is successful you should be able to view your new certification by clicking the padlock next to the URL in Chrome and selecting **Connection is secure > Certificate is valid**