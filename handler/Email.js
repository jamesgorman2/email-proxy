
module.exports = class Email {

  constructor({from, to = [], cc = [], bcc = [], subject, body} = {}) {
    this.from = from;
    this.to = to;
    this.cc = cc;
    this.bcc = bcc;
    this.subject = subject;
    this.body = body;
  }

  validEmail(s) {
    // quick test that it is a non-empty string, 
    // could add format validity checking
    return Boolean(s && typeof s === 'string');
  }

  validText(s) {
    return Boolean(s && typeof s === 'string');
  }

  validRecipient(r) {
    // empty or only valid emails
    return Array.isArray(r) &&
      r.map(this.validEmail).find(e => e === false) === undefined;
  }

  hasRecipient() {
    return this.validRecipient(this.to) && 
      this.validRecipient(this.cc) &&
      this.validRecipient(this.bcc) &&
      (this.to.length + this.cc.length + this.bcc.length) > 0;
  }

  canBeSent() {
    return this.validEmail(this.from) &&
      this.hasRecipient() &&
      this.validText(this.subject) && 
      this.validText(this.body);
  }
};