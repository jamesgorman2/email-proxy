const Handler = require('../Handler.js');
const Email = require('../Email.js');
const InvalidInput = require('../InvalidInput.js');

describe('handle should', () => {
  const email = {};
  test('emit 400 if parse email failed with InvalidInput', () => {
    expect.assertions(2);
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
    const res = new MockResponse();
    const emailParser = { parseEmail: () => Promise.reject(new InvalidInput('Failed')) };
    return new Handler(null, emailParser)
      .handle(req, res)
      .then(() => {
        expect(res._status).toEqual(400);
        expect(res._body).toEqual('Failed');
      });
  });
  test('emit 500 if parse email failed otherwise', () => {
    expect.assertions(2);
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
    const res = new MockResponse();
    const emailParser = { parseEmail: () => Promise.reject('foo') };
    return new Handler(null, emailParser)
      .handle(req, res)
      .then(() => {
        expect(res._status).toEqual(500);
        expect(res._body).toEqual('Server Error');
      });
  });
  test('emit 500 if emailServices.send failed', () => {
    expect.assertions(2);
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
    const res = new MockResponse();
    const emailParser = { parseEmail: () => Promise.resolve(email) };
    const emailServices = { send: () => Promise.reject('foo') };
    return new Handler(emailServices, emailParser)
      .handle(req, res)
      .then(() => {
        expect(res._status).toEqual(500);
        expect(res._body).toEqual('Server Error');
      });
  });
  test('emit 204 if emailServices.send succeeded', () => {
    expect.assertions(2);
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
    const res = new MockResponse();
    const emailParser = { parseEmail: () => Promise.resolve(email) };
    const emailServices = { send: () => Promise.resolve('foo') };
    return new Handler(emailServices, emailParser)
      .handle(req, res)
      .then(() => {
        expect(res._status).toEqual(204);
        expect(res._body).toBeUndefined();
      });
  });

});

class MockResponse {
  constructor() {
    this._status = null;
    this._body = null;
  }

  status(code) {
    this._status = code;
    return this;
  }
  send(body) {
    this._body = body;
    return this;
  }
}