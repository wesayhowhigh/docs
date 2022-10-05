---
sidebar_position: 3
sidebar_label: Exporting Website
---

# Exporting Website for 3rd Party Host

## Database Exporting

Export the database with content, excluding `system_event_logs` and `system_request_logs`.

:::danger
After export open the sql file and check there are no postmark or other settings that are saved in `system_settings` that could expose any api keys or passwords.
:::

## S3 and assets

If the assets are stored in S3 then you will need to export them to your local machine to zip up (if the assets are local you can skip this step as they will be zipped with the site files next, but this is unlikely).

### AWS Cli

To export S3 files you will need the AWS Cli. If this already setup on your machine you can skip to the [S3 export command](#aws-s3).

First you will need the AWS Cli installed on your machine. If it is not installed, [see here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Then run, `aws configure`, it will ask you for your IAM keys.

```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: eu-west-1
Default output format [None]: json
```

### AWS S3

```bash
aws s3 cp s3://<BUCKET-NAME> ~/Downloads/s3-assets --recursive
```

Then zip these up in a file named `s3-assets.zip`.

## Website files

1. SSH in to the lightsail for the website
2. SSH in to app container

```bash
docker exec -it $(docker ps -f name=ubuntu_app_1 -q) sh
```

3. Zip all the files up

```bash
zip -r website.zip ./
```

4. Exit from the docker container and copy bundled file outside the container

```bash
docker cp $(docker ps -f name=ubuntu_app_1 -q):/var/www/html/website.zip ./
```

5. On your local machine secure copy the bundled file locally

```bash
scp ubuntu@<LIGHTSAIL-PUBLIC-IP>:website.zip ~/Downloads/
```

:::warning
You may need to add the lightsail key to your ssh session

`ssh-add <path-to-key-file>.pem`
:::

### `.env`

The `.env` file will need to be inside the `website.zip` for the client to use on their preferred hosting but all passwords and api keys need to be removed first.

**e.g. Database, Postmark, Google Maps, AWS IAM Keys etc.**

The following should cleared ("`DB_HOST= `"):
- `DB_HOST`
- `DB_DATABASE`
- `DB_USERNAME`
- `DB_PASSWORD`
- `MAIL_HOST`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `SENTRY_DSN`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET`
- `JUMP_RECAPTCHA_PUBLIC_KEY`
- `JUMP_RECAPTCHA_PRIVATE_KEY`

The follow should be changed:
- `FILESYSTEM=local`

## Finally

Then Once all the above is done, create a [WeTranfer](https://wetransfer.com/) link with the following in:
- Database SQL file
- `website.zip`
- `s3-assets.zip`

The wetransfer link will need to be given to the client contact along with the instructions below.

## Instructions for the Client

The website requires the following from the webserver:

- PHP 7.1+
- PHP FPM 7
- NGINX (Apache can be configured but is out of scope of this document)

The website ZIP will need to be unzipped to the webserver and then the s3-assets zip can be unzipped into the /storage/app directory. This should give you /storage/app/media and /storage/app/uploads.

Configuring the Web Application

1. Change Database credentials in .env file:
    - Set DB_HOST, DB_DATABASE, DB_USERNAME and DB_PASSWORD to match your database details

2. To get the website sending Emails you'll need to update the mail settings in .env file
    - Current site used Postmark for transactional emails: https://postmarkapp.com but various mail drivers can be used. See https://laravel.com/docs/5.5/mail for more details
    - Set MAIL_DRIVER, MAIL_HOST, MAIL_PORT, MAIL_ENCRYPTION, MAIL_USERNAME, MAIL_PASSWORD to match your desires

3. Setup Recpatcha to prevent spam submissions on website forms
    - Create a Google account if you don't already have one and head to https://www.google.com/recaptcha
    - Create a v2 API which will generate a Public and Private key
    - Add these to the .env file under JUMP_RECAPTCHA_PUBLIC_KEY and JUMP_RECAPTCHA_PRIVATE_KEY

4. Google Analytics & Google Tag Manager
    - It looks like you're the account owner for these accounts so you can leave the current JUMP_ANALYTICS_TAG_MANAGER_ID value in the .env file
    - If you wanted to create a new Tag Manager account, it is this value you would change
    - Remember to remove JUMP from the Analytics and Tag Manager access

5. Set up Google Maps API Key
    - Create a Google account if you don't already have one and head to https://developers.google.com/maps/documentation/javascript/overview
    - Follow the steps (including setting up a Billing Account) for setting up a Google Maps Javascript API key
    - Once you've generated, paste it in the .env file under GOOGLE_API_KEY and GOOGLE_MAPS_API_KEY

6. Force security
    - You can enable redirection to HTTPS by setting JUMP_HTTP_FORCE_HTTPS=true
    - You can enable redirection to www. by setting JUMP_HTTP_FORCE_CANONICAL=true
