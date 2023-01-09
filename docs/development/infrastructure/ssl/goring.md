---
sidebar_position: 6
sidebar_label: Goring SSL
---

# Goring SSL

Goring sites currently do not use CloudFront and instead have LetsEncrypt running on the Lightsails providing SSL certificates.

:::caution

Goring SSLs no longer need to be touched but I thought I'd provide the information here for posterity

:::

## Certbot 

Certbot is already installed on the Lightsail and is responsible for generating SSLs.
To generate them, the docker container needs to be brought down temporarily, the certbot command ran, the certificates moved and renamed and then the docker container brought back up.

1. Bring down the docker container `docker-compose -f docker-compose.prod.yml down`

2. Run `sudo certbot certonly --standalone` and follow instructions:
   1. Enter `developers@wesayhowhigh.com` when asked for email address 
   2. Agree to the first set of terms 
   3. Say No to the second set of terms (about statistics etc)
   4. In the domain part **make sure you include www and non-www comma separated (eg: domain.com,www.domain.com)**

Once successful It will place 2 files inside `/etc/letsencrypt/live/DOMAIN/` - fullchain.pem and privkey.pem.
You'll want to move and rename them into /etc/ssl/

3. It's easier to do this in sudo (as you can TAB to autofill the correct directories) so type `sudo su` and hit Enter

4. Copy `fullchain.pem` as site.cert - `cp /etc/letsencrypt/live/DOMAIN/fullchain.pem /etc/ssl/site.cert`

5. Copy `privkey.pem` as site.key - `cp /etc/letsencrypt/live/DOMAIN/privkey.pem /etc/ssl/site.key`

6. Bring up the docker container - `docker-compose -f docker-compose.prod.yml up`

7. Visit the website and inspect the certificate to make sure the expiry date has increased\


## Certbot Automated Renewal

To enable auto-renewal on LetsEncrypt (Cerbot) Goring Sites:

Switch to sudo: `sudo su`
Go to the `renewal-hooks` directory inside the LetsEncrypt directory `cd /etc/letsencrypt/renewal-hooks`
You'll see 3 directories inside there; `pre`, `deploy` and `post` - you'll be creating a script in each of those folders and making them executable.

Create the pre.sh file first:
Type `vi /pre/pre.sh` to open up Vi ready for editing. Hit `I` to go to INSERT mode (prevents copy and pasting stripping the first few characters).
Once pasted, hit Esc then type `!wq` and press Enter to quit and save the file.

### Pre Script

```bash title="/etc/letsencrypt/renewal-hooks/pre/pre.sh"
#!/bin/sh

# Bring down website to allow cert validation
docker-compose -f /home/ubuntu/docker-compose.prod.yml down
```


### Deploy Script

```bash title="/etc/letsencrypt/renewal-hooks/deploy/deploy.sh"
#!/bin/sh

# Backup existing certificates
cp /etc/ssl/site.key /etc/ssl/site.key.backup
cp /etc/ssl/site.cert /etc/ssl/site.cert.backup

# Copy across new certificates
cp $RENEWED_LINEAGE/fullchain.pem /etc/ssl/site.cert
cp $RENEWED_LINEAGE/privkey.pem /etc/ssl/site.key
```


### Post Script

```bash title="/etc/letsencrypt/renewal-hooks/post/post.sh"
#!/bin/sh

# Bring up website
docker-compose -f /home/ubuntu/docker-compose.prod.yml up -d
```

**Make Files Executable**
Type the following commands to make the files you've just created executable:

`chmod +x pre/pre.sh`

`chmod +x deploy/deploy.sh`

`chmod +x post/post.sh`