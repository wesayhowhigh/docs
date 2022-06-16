---
sidebar_position: 2
sidebar_label: Facebook
---

# Facebook

## Introduction

The JUMP Social Media **Facebook** integration will show total likes for the provided Facebook account.

## Configuration

### Setup
Ensure you have an App ID and App Secret token in your env file.
```dotenv title=".env"
FACEBOOK_APP_ID=260095523557421
FACEBOOK_APP_SECRET=0214dc63bbe87h06ce7101za1f3x23359
```

Details on how to obtain an access token can be found at: https://developers.facebook.com/docs/graph-api

### Usage

There is a query called jump_socialMedia_facebookLikes that returns an array of Jump\SocialMedia\Classes\Facebook

Example queries.yml
```yaml
facebookLikes:
  type: jump_socialMedia_facebookLikes
```

Example twig
```twig
<div>
    {{ _.facebookLikes.getFacebookLikes() }}
</div>
```