import { test, expect } from 'vitest'
import * as validators from '../src'

test('validators', async () => {
  const aNumber = 10
  expect(validators.number(aNumber)).toBe(true)
  expect(validators.float(aNumber)).toBe(true)
  expect(validators.int(aNumber)).toBe(true)

  const aString = 'hello this is a long string hello what is wrong yes'
  expect(validators.id(aString)).toBe(false)
  expect(validators.string(aString)).toBe(true)
  expect(validators.type(aString)).toBe(false)

  const id = 'flap10213312'
  expect(validators.id(id)).toBe(true)
  expect(validators.type(id)).toBe(true)

  const url = 'wss://flap.com'
  expect(validators.url(url)).toBe(true)

  const email = 'jim+hello@saulx.com'
  expect(validators.email(email)).toBe(true)
})

test('password validators', async () => {
  //@ts-ignore
  expect(validators.password()).toBe(false)
  expect(validators.password('')).toBe(false)
  expect(validators.password('monkey')).toBe(false)
  expect(validators.password('123')).toBe(false)
  expect(validators.password('password')).toBe(false)
  //@ts-ignore
  expect(validators.validatePassword().valid).toBe(false)
  expect(validators.validatePassword('').valid).toBe(false)
  expect(validators.validatePassword('password').valid).toBe(false)

  expect(validators.password('Schaap99!')).toBe(true)
  expect(validators.validatePassword('Schaap99!').valid).toBe(true)
})
