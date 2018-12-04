const EmailParser = require('../EmailParser.js');
const Email = require('../Email.js');
const InvalidInput = require('../InvalidInput.js');

describe('parseEmail should', () => {
  test('return email if can be sent', () => {
    const req = {
      body: {
        from: 'from foo',
        to: ['to bar'],
        cc: ['cc bar'],
        bcc: ['bcc bar'],
        body: 'body baz',
        subject: 'subject baz'
      }
    };
    expect.assertions(1);
    return expect(
      new EmailParser().parseEmail(req)
    )
      .resolves.toEqual(
        new Email({
          from: 'from foo',
          to: ['to bar'],
          cc: ['cc bar'],
          bcc: ['bcc bar'],
          body: 'body baz',
          subject: 'subject baz'
        })
      );
  });
  test('return error if cannot be sent', () => {
    const req = {
      body: {
        to: ['to bar'],
        cc: ['cc bar'],
        bcc: ['bcc bar'],
        body: 'body baz',
        subject: 'subject baz'
      }
    };
    expect.assertions(1);
    return expect(
      new EmailParser().parseEmail(req)
    )
      .rejects.toEqual(
        new InvalidInput('Email missing required parameters')
      );
  });
});