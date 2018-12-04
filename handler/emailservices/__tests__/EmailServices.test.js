const EmailServices = require('../EmailServices.js');

describe('constructor should', () => {
  test('fail if no services', () => {
    expect(() => new EmailServices())
      .toThrowError('Must supply at least one email service.');
  });
  test('fail if empty services', () => {
    expect(() => new EmailServices([]))
      .toThrowError('Must supply at least one email service.');
  });
  test('succeed if one service', () => {
    expect(() => new EmailServices([{}])).toBeDefined();
  });
});

describe('send should', () => {
  const email = {};

  test('fail if single service fails', () => {
    expect.assertions(2);
    const s = new MockEmailService(false);
    return new EmailServices([s])
      .send(email)
      .catch(() => {
        expect(s.called).toEqual(1);
        expect(s.email).toBe(email);
      });
  });
  test('succeed if single service succeeds', () => {
    expect.assertions(2);
    const s = new MockEmailService(true);
    return new EmailServices([s])
      .send(email)
      .then(() => {
        expect(s.called).toEqual(1);
        expect(s.email).toBe(email);
      });
  });
  test('fail if all services fail after trying each', () => {
    expect.assertions(6);
    const s1 = new MockEmailService(false);
    const s2 = new MockEmailService(false);
    const s3 = new MockEmailService(false);
    return new EmailServices([s1, s2, s3])
      .send(email)
      .catch(() => {
        expect(s1.called).toEqual(1);
        expect(s1.email).toBe(email);
        expect(s2.called).toEqual(1);
        expect(s2.email).toBe(email);
        expect(s3.called).toEqual(1);
        expect(s3.email).toBe(email);
      });
  });
  test('succeed when any service succeeds', () => {
    expect.assertions(5);
    const s1 = new MockEmailService(false);
    const s2 = new MockEmailService(true);
    const s3 = new MockEmailService(true);
    return new EmailServices([s1, s2, s3])
      .send(email)
      .then(() => {
        expect(s1.called).toEqual(1);
        expect(s1.email).toBe(email);
        expect(s2.called).toEqual(1);
        expect(s2.email).toBe(email);
        expect(s3.called).toEqual(0);
      });
  });
});

class MockEmailService {
  constructor(succeeds) {
    this.succeeds = succeeds;
    this.called = 0;
    this.email = null;
  }

  send(email) {
    this.email = email;
    this.called += 1;
    return this.succeeds ?
      Promise.resolve() :
      Promise.reject();
  }
}