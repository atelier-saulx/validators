import { bench, describe } from 'vitest'
import { email } from '../src'
import { emailSafe } from '../src/emailSafe'

describe('email benchmark', () => {
  bench('simple valid email', () => {
    email('user@example.com')
  })

  bench('complex email with special chars', () => {
    email('user+tag.sort!#$%@sub.example.com')
  })

  bench('invalid email (no @)', () => {
    email('invalid-email-no-at-sign')
  })

  bench('long email (150 chars)', () => {
    email('a'.repeat(50) + '@' + 'b'.repeat(100) + '.com')
  })
})

describe('emailSafe benchmark', () => {
  bench('simple valid email', () => {
    emailSafe('user@example.com')
  })

  bench('complex email with special chars', () => {
    emailSafe('user+tag.sort!#$%@sub.example.com')
  })

  bench('invalid email (no @)', () => {
    emailSafe('invalid-email-no-at-sign')
  })

  bench('long email (150 chars)', () => {
    emailSafe('a'.repeat(50) + '@' + 'b'.repeat(100) + '.com')
  })
})
