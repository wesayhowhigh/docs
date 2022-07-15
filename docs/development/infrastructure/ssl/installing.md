---
sidebar_position: 2
sidebar_label: Installing/Requesting SSL
---

# Installing an SSL Certificate

There are currently 2 options for SSL Certificates:
- [Free Amazon Certificate](#requesting-a-free-amazon-certificate)
- [Paid for 3rd Party SSL](#installing-a-3rd-party-certificate)


:::info

Certificates and CloudFront Distributions are the only sections of the AWS console you want to be in US-EAST-1 (N. Virginia).

Everything else in AWS needs to be in EU-WEST-1 (Ireland)

:::


## Requesting a Free Amazon Certificate


:::info

You will need to create DNS records for verification so ensure you either have DNS access or can pass on the records to someone who can

:::



1. Visit the AWS Certificate Manager once logged into the AWS Console.

2. Ensure you are in US-EAST-1 (N. Virginia) by selecting the region selector.

3. Click the **Request** button at the top of the list of current certificates

    ![Requesting a Certificate](./assets/request-ssl-1.png)


4. Click Next for Requesting a Public Certificate

    ![Requesting a Public Certificate](./assets/request-ssl-2.png)


5. Type in the names of the domain you want a certificate for - **remembering to include www too**! You can also choose between DNS or Email validation. DNS validation is nearly always easier (as you can't specify an email address) so ensure you have access to the DNS provider for the new domain.

    Remember to add a **Tag** of Key `BillingName` and Value `site-NAME-OF-YOUR-WEBSITE`

    Click the **Request** button

   ![Specifying a domain](./assets/request-ssl-3.png)


6. View the Certificate detail page for the one you just requested. You should see the DNS records that need to be added before Amazon can actually generate the Certificate

    ![Viewing the Certificate Detail](./assets/request-ssl-4.png)


7. Created the records however you have to. Either do it yourself if you have DNS access, click the Export to CSV button and send to a 3rd party or - easiest of all and also rarest - if JUMP has DNS access via AWS Route 53, click the **Create records in Route 53** button to have Amazon do it for you!

8. Once the records have been created you should see their status change to **Success** and the Certificate will be available to use in a [CloudFront distribution](../cloudfront/intro).



## Installing a 3rd Party Certificate

1. Ensure you have the following from the 3rd party:

   1. Private Key (begins with `-----BEGIN PRIVATE KEY-----`)
   
   2. Certificate Body (begins with `-----BEGIN CERTIFICATE-----`)
   
   3. Certificate Chain (also begins with `-----BEGIN CERTIFICATE-----` but contains multiple)
   
2. Visit the AWS Certificate Manager once logged into the AWS Console.

3. Ensure you are in US-EAST-1 (N. Virginia) by selecting the region selector.

4. Click the **Import** button at the top of the list of current signatures

   ![Requesting a Certificate](./assets/request-ssl-1.png)


5. Paste in the values from Step 1 and click the **Next** button, add the **Tag** of Key `BillingName` and Value `site-NAME-OF-YOUR-WEBSITE` on the next page and click the **Next** button.

   ![Importing certificate values ](./assets/import-ssl-1.png)


6. Verify the information looks correct (you should see the domain name for that certificate - ensure it also contains www subdomain) and click **Import**

7. The Certificate will now be available to use in a [CloudFront distribution](../cloudfront/intro).


