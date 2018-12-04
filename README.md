# Requirements

* npm
* yarn

# Running

```
yarn install
export MAILGUN_DOMAIN=xxx 
export MAILGUN_APIKEY=xxx
export SENDGRID_APIKEY=xxx 
yarn run start
```

# Notes

Since the recommendation was for a few hours and a I had to re-learn node,
where I got to is:
* server only runs on port 3000
* probably working, not tested against a live site
* tested except for `index.js` and the two email services 
  (`Mailgun.js` and `SendGrid.js`)
* lacking deep validation around email params
* lacking any throttling or resilience beyond failover to the the
  next email service when send to downstream
* no types, these would be preferable (eg Flow) 
* useful error messaging beyond 400 vs 500

There is also no remote running (see above, replace node with AWS/Google/etc).