---
sidebar_position: 2
sidebar_label: Upgrading
---

# Upgrading a Lightsail

## Use/Create a Snapshot

1. If you don't already have a Snapshot of the site you want to upgrade, create one by clicking **Snapshots > Create Snapshot**

2. Select the 3 Dots at the end of the Snapshot name and click **Create new instance** - this will create a new Lightsail (LS) and use the Snapshot as a base image - saving you time from setting up a new LS from scratch

3. Increment the number at the end of the site name, select the new size of the LS instance and click **Create instance**

4. When AWS has provisioned the new LS you will see it has received a new IP Address - take note of this.

**Depending on how old the snapshot is you used, there may be an additional step next:**


## Next Steps If You're using an old snapshot:
If you haven't just created this snapshot then you'll need to make sure this is using the latest version of the codebase.

1. Update the `ORIGIN_IP` env in Semaphore for this project and point it to the new IP address from the previous step.

2. Redeploy as standard - this will deploy the site as normal, but to your new LS instance instead.

3. Ensure deployment is successful

Continue with below steps:


## Next Steps for all

1. Make sure the site is running OK by SSHing onto the new LS and running `docker ps` in the command line - you should see the application docker image running

The next steps vary depending on whether the site you're planning on upgrading is using a **Static IP** or not:



## Next Steps if your site HAS a Static IP

1. Simply detach the Static IP address from the current LS and attach it to the upgraded LS
   (I find it easier to select the Static IP address to go to the Static IP Detail page - then click the **Detach** button, then select the new LS in the dropdown and click the **Attach** button)

2. Check the site is now live by visiting the website URL.

3. You are done! See Cleanup Steps below



## Next Steps if your site DOES NOT HAVE a Static IP

1. If this is a temporary upgrade (i.e. you know the site will be downgraded in a couple of months) then it may be worth creating a new Static IP and attaching that to your new LS instance as it will make it easier and quicker when you later come to downgrade.

2. Copy the IP Address of the new LS

3. Go to **AWS CloudFormation > Stacks** and look for your site in the list. Click it to go to the detail view for the stack

4. Click on the **Update** button, then **Next** button and you should see a page containing **Parameters**

5. Inside the **OriginIp** field you should see the current IP address of the old LS instance.

6. Paste in the new IP Address from step 2 and click **Next** and follow the steps until the Stack gets updated - this can take several minutes.

7. When the CloudFormation Stack status is `UPDATE_COMPLETE` then check the site is now live by visiting the website URL

8. Update the `ORIGIN_IP` env value in **Semaphore** with the new LS IP Address, if you haven't already.

9. You are done! See Cleanup Steps below



## Cleanup

1. Press Stop on the old LS instance.

2. Check the site is still live just in case!

3. Add to your calendar for the next working day to Delete the old LS instance - I like to give it a day just in case something goes wrong and we quickly need to get the old site instance back up for some reason.
 