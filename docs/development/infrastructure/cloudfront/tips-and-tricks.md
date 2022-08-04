---
sidebar_position: 10
sidebar_label: Tips & Tricks
---

# CloudFront Tips & Tricks

## Example Athena CloudFront Log Query

The example query below groups CF requests by IP and lets you see if there are any dodgy IP addresses spamming your website:
```sql
SELECT request_ip, COUNT(request_ip) as numberOfRequests
FROM "default"."cloudfront_logs"
WHERE "date" BETWEEN DATE '2021-05-09' AND DATE '2021-05-18'
GROUP BY request_ip
ORDER BY numberOfRequests desc
limit 15000
```