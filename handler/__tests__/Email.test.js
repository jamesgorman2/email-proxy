const Email = require('../Email.js');

describe('validEmail should', () => {
  test('reject empty strings', () => {
    expect(new Email().validEmail('')).toBe(false);
  });
  test('reject numbers', () => {
    expect(new Email().validEmail(5)).toBe(false);
  });
  test('reject booleans', () => {
    expect(new Email().validEmail(true)).toBe(false);
  });
  test('reject objects', () => {
    expect(new Email().validEmail({})).toBe(false);
  });
  test('reject null', () => {
    expect(new Email().validEmail(null)).toBe(false);
  });
  test('reject undefined', () => {
    expect(new Email().validEmail(undefined)).toBe(false);
  });
  test('accept non-empty strings', () => {
    expect(new Email().validEmail('foo')).toBe(true);
  });
});


describe('validText should', () => {
  test('reject empty strings', () => {
    expect(new Email().validText('')).toBe(false);
  });
  test('reject numbers', () => {
    expect(new Email().validText(5)).toBe(false);
  });
  test('reject booleans', () => {
    expect(new Email().validText(true)).toBe(false);
  });
  test('reject objects', () => {
    expect(new Email().validText({})).toBe(false);
  });
  test('reject null', () => {
    expect(new Email().validText(null)).toBe(false);
  });
  test('reject undefined', () => {
    expect(new Email().validText(undefined)).toBe(false);
  });
  test('accept non-empty strings', () => {
    expect(new Email().validText('foo')).toBe(true);
  });
});

describe('validRecipient should', () => {
  test('accept empty array', () => {
    expect(new Email().validRecipient([])).toBe(true);
  });
  test('accept array with single valid emails', () => {
    expect(new Email().validRecipient(['foo'])).toBe(true);
  });
  test('accept array with only valid emails', () => {
    expect(new Email().validRecipient(['foo', 'bar', 'baz'])).toBe(true);
  });
  test('reject array with invalid email', () => {
    expect(new Email().validRecipient(['foo', '', 'baz'])).toBe(false);
  });
  test('reject array with invalid email', () => {
    expect(new Email().validRecipient([''])).toBe(false);
  });
  test('reject string', () => {
    expect(new Email().validRecipient('foo')).toBe(false);
  });
  test('reject number', () => {
    expect(new Email().validRecipient(3)).toBe(false);
  });
  test('reject boolean', () => {
    expect(new Email().validRecipient(true)).toBe(false);
  });
  test('reject undefined', () => {
    expect(new Email().validRecipient(undefined)).toBe(false);
  });
  test('reject null', () => {
    expect(new Email().validRecipient(null)).toBe(false);
  });
});

describe('hasRecipient should', () => {
  const baseParams = {from: 'foo', subject: 'bar', body: 'baz'};
  test('return false when no to, cc or bcc recipient', () => {
    expect(new Email(baseParams).hasRecipient()).toBe(false);
  });
  test('return true when only to recipient', () => {
    expect(new Email({...baseParams, to: ['foo']}).hasRecipient()).toBe(true);
  });
  test('return true when only cc recipient', () => {
    expect(new Email({...baseParams, cc: ['foo']}).hasRecipient()).toBe(true);
  });
  test('return true when only bcc recipient', () => {
    expect(new Email({...baseParams, bcc: ['foo']}).hasRecipient()).toBe(true);
  });
  test('return true when all recipients', () => {
    expect(new Email({...baseParams, to: ['foo'], cc: ['foo'], bcc: ['foo']}).hasRecipient()).toBe(true);
  });
});

describe('canBeSent should', () => {
  const baseParams = {from: 'foo', to: ['foo'], subject: 'bar', body: 'baz'};
  test('return false when no from', () => {
    expect(new Email({...baseParams, from: null}).canBeSent()).toBe(false);
  });
  test('return false when no recipents', () => {
    expect(new Email({...baseParams, to: null}).canBeSent()).toBe(false);
  });
  test('return false when no subject', () => {
    expect(new Email({...baseParams, subject: null}).canBeSent()).toBe(false);
  });
  test('return false when no body', () => {
    expect(new Email({...baseParams, body: null}).canBeSent()).toBe(false);
  });
  test('return true otherwise', () => {
    expect(new Email(baseParams).canBeSent()).toBe(true);
  });
});