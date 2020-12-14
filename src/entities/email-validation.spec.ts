import { Email } from './email'

describe('Email validation', () => {
  test('should not accept null strings', () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })
})

describe('Email validation', () => {
  test('should not accept empty strings', () => {
    const email = ''
    expect(Email.validate(email)).toBeFalsy()
  })
})

describe('Email validation', () => {
  test('should accept valid email', () => {
    const email = 'any@email.com'
    expect(Email.validate(email)).toBeTruthy()
  })
})

describe('Email validation', () => {
  test('should not accept strings larger than 320 chars', () => {
    const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })
})

describe('Email validation', () => {
  test('should not accept local part larger than 64 chars', () => {
    const email = 'l'.repeat(65) + '@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
