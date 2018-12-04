const EmailServices = require('./emailservices/EmailServices.js');
const EmailParser = require('./EmailParser.js');
const InvalidInput = require('./InvalidInput.js');

module.exports = class Handler {

  static build() {
    return new Handler(EmailServices.build(), new EmailParser());
  }

  constructor(emailServices, emailParser) {
    this.emailServices = emailServices;
    this.emailParser = emailParser;
  }

  handle(req, res) {
    return this.emailParser.parseEmail(req)
      .then(email => this.emailServices.send(email))
      .then(() => res.status(204).send())
      .catch(ex => {
        if (ex instanceof InvalidInput) {
          res.status(400).send(ex.message);
        } else {
          // This covers all failures, doesn't explain if it is local or from
          // downstream
          res.status(500).send('Server Error');
        }
      });
  }
};