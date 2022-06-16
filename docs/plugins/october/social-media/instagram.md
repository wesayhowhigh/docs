---
sidebar_position: 3
sidebar_label: Instagram
---

# Instagram

## Introduction

The JUMP Social Media **Instagram** integration will show the Instagram feed for the provided Instagram account. 

The following parameters can be defined.
- Limit number of posts
- Show/Hide posts that have a type of carousel albums


The Instagram module is using the basic display api along with the Long-Lived Access Token option, each token lasts 60 days and is automatically 
refreshed via the website before it is due to expire. 

## Configuration

### Setup
Ensure you have an access token in your env file.
```dotenv title=".env"
JUMP_SOCIAL_MEDIA_INSTAGRAM_TOKEN=IGQVJXU0xaMlJRRHVkU05pWV90ZADg3amtsNFhyV2p5LWJUUmh5MHFnPLW5T
```

Details on how to obtain an access token can be found at: https://developers.facebook.com/docs/instagram-basic-display-api/overview#user-token-generator

### Usage

There is a query called jump_socialMedia_instagramPosts that returns an array of Jump\SocialMedia\Classes\InstagramPost

Example queries.yml
```yaml
instagramPosts:
  type: jump_socialMedia_instagramPosts
  params:
    limit: 6
    hideCarouselAlbums: false
```

Example twig
```twig
{% for post in _.instagramPosts %}
    <a href="{{ post.getLink() }}">
        <img src="{{ post.getImagePath() }}" />
    </a>
    <h2>{{ post.getCaption() }}</h2>
    <h3>{{ post.getDate() | date("m/d/Y") }}</h3>
{% endfor %}
```