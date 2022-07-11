---
sidebar_position: 4
sidebar_label: Troubleshooting
---

# Troubleshooting

## Unresponsive Lightsail 

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
