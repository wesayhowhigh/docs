---
sidebar_position: 2
sidebar_label: Lightsail Troubleshooting
---

# Lightsail Troubleshooting

This page covers common issues and troubleshooting steps for AWS Lightsail instances.

## No Space Left on Device

If your Lightsail instance is down and you're seeing a *"No space left on device"* error when trying to deploy or run commands, it's likely that the disk is full. This can happen if logs or other temporary files have accumulated over time and filled up the available space. To resolve this, you can clean up some space by removing old logs, temporary files, or unused packages.

### Steps to resolve:

1. SSH into your Lightsail instance
 
If you are struggling to SSH into the instance you can try restarted the instance first. It can sometimes help. But to not stop the instance as this will loose the currently assigned IP address.

2. Run the following commands to check disk usage:

```bash
df -h
```

3. If you see that your disk is full, you can clean up some space by removing old logs, temporary files, or unused packages.

```bash
# Remove unused packages
sudo apt autoremove
sudo apt clean
```

4. Check disk usage by directory

This will show you the largest directories on your system.
```bash
sudo du -h --max-depth=1 / 2>/dev/null | sort -hr
```

You can then run tha command on those directories to dig further to see what directories are taking up the most space. You can increate the max-depth parameter but this can cause it to take long, it is more performant to run it on specific directories.

```bash
sudo du -h --max-depth=1 /path/to/directory 2>/dev/null | sort -hr
```

5. As a last resort, if you're still running out of space, you can try to increase the disk size of your Lightsail instance. You must snapshot the current disk first, then create a new disk with the increased size from the snapshot.
