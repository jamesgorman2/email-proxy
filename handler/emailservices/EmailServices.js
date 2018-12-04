const assert = require('assert').strict;

const Mailgun = require('./Mailgun.js');
const SendGrid = require('./SendGrid.js');

module.exports = class EmailServices {

  static build() {
    return new EmailServices([Mailgun.build(), SendGrid.build()]);
  }

  // Order of services is order of execution
  constructor(services) {
    assert(Array.isArray(services) && services.length > 0, 'Must supply at least one email service.');
    this.services = services;
  }

  send(email) {
    const [head, ...tail] = this.services;
    // This should really have 
    //   a) counters
    //   b) a circuit breaker
    // This is just showing off a bit since there are only two target services and
    // we could just unwrap this by hand
    return tail
      .reduce(
        (acc, emailService) =>
          acc.catch(() => emailService.send(email)),
        head.send(email)
      );
  }
};