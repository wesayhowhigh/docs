---
sidebar_position: 2
sidebar_label: Secure Copy
---

# Secure Copy a File from a live Docker container to your local machine

Let's say we want the `package-lock.json` file from a website.

## Copy file from site docker container to system
- SSH onto the Lightsail instance and run `docker ps` to get your sites container ID
- Run `docker cp YOUR_CONTAINER_ID:/var/www/html/package-lock.json ./package-lock.json`

## SSH onto the Bastion from your machine
- On AWS Lightsail check the username and IP of the Bastion Lightsail
- In a terminal window type `ssh -A BASTION_USERNAME@BASTION_IP_ADDRESS`
- You may have to add the Bastions key to your machine for this to work: `ssh-add PATH_TO_BASTION_KEY.PEM`

## Secure copy file from site system to Bastion
- On AWS Lightsail check the username and IP of your website Lightsail
- In the terminal window type `scp WEBSITE_USERNAME@WEBSITE_IP_ADDRESS:~/package-lock.json ./package-lock.json`
- If you get permission denied you may have to add the ssh-add the ssh key of the website (should be site-key.pem) I've included a copy in ~/.ssh folder on the Bastion

## Copy file from Bastion to your local machine
- Type `exit` to log out of the Bastion and return to your local machine
- Type `scp BASTION_USERNAME@BASTION_IP_ADDRESS:~/package-lock.json ~/Desktop` to copy the file to your desktop