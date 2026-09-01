---
sidebar_position: 3
sidebar_label: The day(s) before
---
# The day(s) before
There's usually a couple of tasks that require the content to be in place before we can go live. 

As they can be time consuming (depending on the site), it's best to get them out of the way as soon as possible.

Usually, this is when there's been a line in the sand, and the client is no longer making changes to content.

## Upgrade the Lightsail
As we usually use a smaller Lightsail instance while building the site, it's good to bump our instance up to whatever tier gives us the following when we go live:
* **4GB** Memory
* **2 vCPUs** Processing
* **80GB SSD** Storage
* **4 TB** Transfer

Obviously, some sites will require larger Lightsail instances depending on the expected traffic/strain, but this is a good starting point for the majority of our sites on go live day.

You can follow this [wonderful guide on upgrading your Lightsail instance](/development/infrastructure/lightsail/upgrading) to do this. As creating the snapshot will take a while, you'll be thankful you did this the day before!

## Redirects
Depending on the site you are building, you may have a handful of these, seemingly millions, or none at all.

Either way, there's nothing stopping you getting these in place early.

If the old site has less than 500 pages, you can use a [free Screaming Frog account](https://www.screamingfrog.co.uk/seo-spider/) to generate a list of the existing pages, and then move them to a spreadsheet to action.

If it has more, you may need to ask **Hone** nicely to do this for you.

Once you have your csv file of links, make sure you put the correct redirect in place for each one. 

While there is no true rule of thumb, the following redirects are generally used for each situation:
* **301 - Moved Permanently:** If the old page's content is now featured at a new URL
* **302 - Temporary Redirect:** For when you are briefly sending visitors to an alternate page, while keeping the old URL in the search results
* **303 - See Other:** For direct use after a user submits a form or processes a payment to safely prevent accidental duplicate submissions
* **307 - Temporary Redirect (HTTP 1.1):** When temporarily rerouting API calls or form submissions to a new server without losing or altering the original request payload 
* **410 - Gone:** If the old page's content is no longer available at all

## Sitemap
It can be easy to leave this until last, but it helps to make sure this in place so you aren't scrambling on the day.

Create a new menu in October with the code of **sitemap**. Then, you will need to make sure that the sitemap is generating all of the required URLs.

* For **static pages**, simply add the menu item **All Static Pages** and that should cover all of them
* For **dynamic pages**
  * If you have used a **Base JUMP Plugin** you should have a **All Plugin Posts** menu item you can use
  * If it doesn't exist, or you have created a bespoke plugin: make sure that you have created the relevant **MenuItemGenerator** for your Plugin

Once everything is added, visit `/sitemap.xml` make sure all the pages you would expect to see are in the sitemap, and all the ones you wouldn't, aren't!

## Analytics, Tag Manager and Search Console
Often, the client will already have these set up, so you just need to be given access to these (via either wesayhowhigh@gmail.com or wesayhowhigh2@gmail.com) in good time to get the keys you need and add them to your `.env`.

If not, there's no harm in getting these set up early so they are in place ready for you.

### Analytics
Log in to Analytics and click the ⚙️ to bring up settings. Then you click "Create" to create your new account and fill in the fields that follow.

**As of September 2026**, if you fill out the above form, you'll be brought to a page that invites you to **Start collecting data**. If you click **Web** under **Choose a platform**, you will then be able to set up your web stream.

Do so with your live URL, and click **create**.

You can then click on your new stream to get your **Measurement ID**. Do so, and copy it to your clipboard (while popping it into your `.env` ready as the `JUMP_ANALYTICS_MEASUREMENT_ID`)

### Tag Manager
This was recently made a lot easier, so hopefully Google don't change how they do this again by time you read this (they likely will have).

Create your account, and fill in the form that follows to set it up. Make sure that you copy your **Tag ID** from next to the preview button, to your `.env` as the `JUMP_ANALYTICS_TAG_MANAGER_ID`

Next, go to **Tags** and add a tag of type **Google Tag** and add your **Measurement ID** as the Tag ID.

Submit your workspace changes (after testing them in preview of course) to connect both your site to both Google Properties.

### Search Console
You will not be able to set this up until you go live, but you can get the necessary validation in place now.

If you are looking to validate with a meta tag added to the code itself, generate this now and add it to the code ready.

If you are doing so through DNS, you should be able to do this now to verify your ownership of the domain.

## Maintenance Mode
Then, once all the above has been sorted, put your site into Maintenance Mode ready for go-live the next day.

Sleep well staging site, you have a big day tomorrow.