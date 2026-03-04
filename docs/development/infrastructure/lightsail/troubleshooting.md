---
sidebar_position: 4
sidebar_label: Troubleshooting
---

# Troubleshooting

## Unresponsive Lightsail 

If a Lightsail has become unresponsive you should try the following in this order:
- SSH into the Lightsail and restart the docker containers: `docker-compose -f docker-compose.prod.yml down && docker-compose -f docker-compose.prod.yml up -d`
- No luck? **Restart** the Lightsail - This can look like it doesn't do anything, but give it a couple of minutes
- Still no luck? **Stop** and **Start** the Lightsail. This is a **last resort** as it **changes the IP address of the website**. You will need to update the IP address in Route 53 and Cloudfront (see JB notes below)

### JBs notes
- Tried to SSH on the Lightsail to check logs, it was unresponsive.
- Stopped and Started Lightsail to reboot it - (Took a few minutes)
- Lightsail started, checked i could SSH in now.
- Checked the IP address and noticed it was assigned a new one - (This is because no static IP is set).
- Went to Cloudformation to update the IP address, could not find the Marlish stack - If this is the case then It's an old site and it is set up slightly different.
- Went to Cloudfront, searched Marlish. Clicked the distribution ID and navigated to the Origins tab, checked what app was set too - in this case it was marlish.origin.jump-ops.com.
- Went to Route 53, (Personally changed the console to the old version as i think the new UI is terrible and hard to navigate)
- When in Route 53 i searched for jump-ops.com in the hosted zones. Clicked in to jump-ops.com and searched for marlish.origin.jump-ops.com.
- Updated the IP address to the new one we got from the Lightsail reboot, clicked save record set.
- Updated the same new IP address to the project in Semaphore for future deployments.

(ripped off from JBs Wiki Entry - could use with a rewrite to be more generic)


## Low Disk Space

The Lightsail instance can run out of disk space. This can be checked by SSHing into the instance and running `df -h`, but you'll already likely know as Sentry will have thrown many random errors about low disk space!

This used to be quite common before we enabled automatic pruning of Docker images on deployment, however it can still happen on rare occasions. 

Nowadays, it is usually caused by temporary files building up over time and not being cleared out automatically.

### How to resolve
To resolve this, you can SSH into the Lightsail instance to check the temporary file locations and clear them out.

However, most of the time, they will be **inside the Docker container itself**, so you'll also need to SSH onto the docker container:

Usually:
```bash
docker exec -it ubuntu-app-1 sh
```

Once inside, check the `/tmp` directory and you'll no doubt see a load of temporary files. You can remove them with:
```bash
rm -rf /tmp/*
```
However, you may want to see if you can identify them first (sometimes they may have a helpful name - such as `GlideXXXX` - or their filesize can be revealing):
```bash
cd /tmp
ls -lah
```
If it's Glide, you know that the user may have gigantic images that Glide is failing to process, so you can try and identify broken images on the site and resize them.
