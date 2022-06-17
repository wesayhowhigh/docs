---
sidebar_position: 4
sidebar_label: Twitter
---

# Twitter

## Introduction

The JUMP Social Media **Twitter** integration will show tweets for the provided Twitter account.

The following parameters can be defined.
- Limit number of tweets

## Configuration

### Setup
Ensure you have a Twitter developer account.

Ensure you have a Twitter Key and Twitter Secret Key in your env file.

```dotenv title=".env"
TWITTER_KEY=7zVdkIqj8K6VMXMdsdf3w4v8
TWITTER_KEY_SECRET=dhKpEEBSj0a28aTtLqREx9V6LUM976Mi32sadJLmbuDxxt6G86Xsdf
```

Details on how to obtain an access token can be found at: https://developer.twitter.com/en/docs/projects/overview

### Usage

There is a query called jump_socialMedia_twitterTweets that returns an array of Jump\SocialMedia\Classes\Twitter

Example queries.yml
```yaml
twitter:
  type: jump_socialMedia_twitterTweets
  params:
    username: "Twitter username"
    limit: 3
```

Example twig
```twig
{% for tweet in _.twitter %}
  <div>
    {{ tweet.getContent() | raw }}

    {{ tweet.getCreatedDate('G:i a jS F Y') | raw }}
  </div>
{% endfor %}
```