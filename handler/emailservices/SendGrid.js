const assert = require('assert').strict;
const requestjs = require('request-promise-native');

module.exports = class SendGrid {

  static build() {
    const apiKey = process.env.SENDGRID_APIKEY;
    assert(apiKey, 'Missing expected SendGrid API key. This must be supplied from the environment variable SENDGRID_APIKEY.');
    return new SendGrid(apiKey, requestjs);
  }
  constructor(apiKey, request) {
    this.apiKey = apiKey;
    this.request = request;
  }

  send(email) {
    const recipients = {};
    if (email.to.length > 0) {
      recipients.to = email.to.join(',');
    }
    if (email.cc.length > 0) {
      recipients.cc = email.cc.join(',');
    }
    if (email.to.length > 0) {
      recipients.bcc = email.bcc.join(',');
    }
    return this.request({
      url: 'https://api:' + this.apiKey + '@api.mailgun.net/v3/' + this.domain + '/messages',
      form: {
        from: email.from,
        subject: email.subject,
        'body-plain': email.body,
        ...recipients
      }
    });
  }
};