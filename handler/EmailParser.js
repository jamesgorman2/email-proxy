const Email = require('./Email.js');
const InvalidInput = require('./InvalidInput.js');

module.exports = class EmailParser {
  
  parseEmail(req) {
    const email = new Email({
      from: req.body.from,
      to: req.body.to,
      cc: req.body.cc,
      bcc: req.body.bcc,
      subject: req.body.subject,
      body: req.body.body
    });

    return email.canBeSent() ?
      Promise.resolve(email) :
      // This could have more detail in it
      Promise.reject(new InvalidInput('Email missing required parameters'));
  }
};