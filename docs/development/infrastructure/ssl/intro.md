---
sidebar_position: 1
sidebar_label: Introduction
---

# SSL Intro
All sites have SSL certificates installed. It's 2022 - of course they are!

These are commonly managed, installed, renewed on [Amazon Certificate Manager](https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/list) and the certificates themselves are attached to the [CloudFront Distributions](https://us-east-1.console.aws.amazon.com/cloudfront/v3/home?region=us-east-1#/distributions).

:::note

The links to ACM and CF above are to the US-EAST-1 region - This is because CloudFront is based in North Virginia. If your certificate is not installed in US-EAST-1 then you will not be able to attach it to the CloudFront distribution

:::