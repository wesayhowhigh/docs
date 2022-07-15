---
sidebar_position: 4
sidebar_label: Troubleshooting
---

# Troubleshooting

### I've Reimported a Certificate but the frontend is still showing the old one

- First of all, it can take a few minutes to an hour to propagate. Be patient.

- Try incognito mode in your browser in case it's cached it.

- Did you definitely Reimport a Certificate in the correct region (US-EAST-1)?

- Check the CloudFront Distribution for the website and make sure the SSL Certificate attached there is linking to the one you just re-imported. 

