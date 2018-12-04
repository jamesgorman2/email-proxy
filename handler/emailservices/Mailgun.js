const assert = require('assert').strict;
const requestjs = require('request-promise-native');

module.exports = class Mailgun {

  static build() {
    const domain = process.env.MAILGUN_DOMAIN;
    const apiKey = process.env.MAILGUN_APIKEY;
    assert(domain, 'Missing expected Mailgun domain. This must be supplied from the environment variable MAILGUN_DOMAIN.');
    assert(apiKey, 'Missing expected Mailgun API key. This must be supplied from the environment variable MAILGUN_APIKEY.');
    return new Mailgun(domain, apiKey, requestjs);
  }

  constructor(domain, apiKey, request) {
    this.domain = domain;
    this.apiKey = apiKey;
    this.request = request;
  }

  send(email) {
    if (email.to.length > 0) {
      recipients.to = email.map(e => [{'email': e}]);
    }
    if (email.cc.length > 0) {
      recipients.cc = email.map(e => [{'email': e}]);
    }
    if (email.to.length > 0) {
      recipients.bcc = email.map(e => [{'email': e}]);
    }

    return this.request({
      url: 'https://api.sendgrid.com/v3/mail/send',
      headers: {
        'Authorization': 'Bearer ' + this.apiKey,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        from: {email: email.from},
        subject: email.subject,
        'content': [{'type': 'text/plain', 'value': email.body}],
        ...recipients
      })
    });
  }
};
