---
sidebar_position: 3
sidebar_label: Downgrading
---

# Downgrading a Lightsail

Downgrading a Lightsail is a bit more involved than [Upgrading a Lightsail](./upgrading) because you can't use an LS Snapshot to create an instance of a smaller size - it has to be the same size or larger.

## Create a new Lightsail instance

Create the new smaller sized instance for the website you wish to downgrade.

Increment the number at the end of the site name (if it's currently named `site-sitename` then the new instance will be named `site-sitename-2`)


## Deploy code to new Lightsail

1. Grab the IP address of the new Lightsail and update the `ORIGIN_IP` in Semaphore and perform another deployment.
2. Once successful, SSH onto the new Lightsail and confirm the new code is present (for example running `docker ps` will show you the app name and that it's been running since the deployment)



## Next Steps if your site HAS a Static IP

If the current website has a static IP address then the next step is easy:

1. Simply detach the Static IP address from the current LS and attach it to the downgraded LS
(I find it easier to select the Static IP address to go to the Static IP Detail page - then click the **Detach** button, then select the new LS in the dropdown and click the **Attach** button)

2. Check the site is now live by visiting the website URL.

3. You are done! See [Cleanup Steps](#cleanup) below



## Next Steps if your site DOES NOT HAVE a Static IP

1. Copy the IP Address of the new LS

2. Go to **AWS CloudFormation > Stacks** and look for your site in the list. Click it to go to the detail view for the stack

3. Click on the **Update** button, then **Next** button and you should see a page containing **Parameters**

4. Inside the **OriginIp** field you should see the current IP address of the old LS instance.

5. Paste in the new IP Address from step 1 and click **Next** and follow the steps until the Stack gets updated - this can take several minutes.

6. When the CloudFormation Stack status is `UPDATE_COMPLETE` then check the site is now live by visiting the website URL

7. Update the `ORIGIN_IP` env value in **Semaphore** with the new LS IP Address, if you haven't already.

8. You are done! See [Cleanup Steps](#cleanup) below


## Cleanup

1. Press Stop on the old LS instance.

2. Check the site is still live just in case!

3. Add to your calendar for the next working day to Delete the old LS instance - I like to give it a day just in case something goes wrong and we quickly need to get the old site instance back up for some reason.
 