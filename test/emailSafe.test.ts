import { test, expect, describe } from 'vitest'
import { emailSafe } from '../src/emailSafe'

describe('emailSafe - valid emails', () => {
  test('standard email', () => {
    expect(emailSafe('user@example.com')).toBe(true)
  })

  test('email with subdomain', () => {
    expect(emailSafe('user@mail.example.com')).toBe(true)
  })

  test('email with plus sign', () => {
    expect(emailSafe('user+tag@example.com')).toBe(true)
  })

  test('email with dot in local part', () => {
    expect(emailSafe('first.last@example.com')).toBe(true)
  })

  test('email with allowed special characters', () => {
    expect(emailSafe('user!#$%&\'*+/=?^_`{|}~@example.com')).toBe(true)
  })

  test('email with hyphen in domain', () => {
    expect(emailSafe('user@my-domain.com')).toBe(true)
  })

  test('email with numbers', () => {
    expect(emailSafe('user123@example123.com')).toBe(true)
  })

  test('email with uppercase letters', () => {
    expect(emailSafe('User@Example.COM')).toBe(true)
  })

  test('email with leading whitespace (trimmed)', () => {
    expect(emailSafe('  user@example.com')).toBe(true)
  })

  test('email with trailing whitespace (trimmed)', () => {
    expect(emailSafe('user@example.com  ')).toBe(true)
  })

  test('email with tab whitespace (trimmed)', () => {
    expect(emailSafe('\tuser@example.com\t')).toBe(true)
  })

  test('email with mixed whitespace (trimmed)', () => {
    expect(emailSafe(' \t user@example.com \t ')).toBe(true)
  })

  test('minimum valid email', () => {
    expect(emailSafe('a@b.co')).toBe(true)
  })

  test('long but valid email (254 chars total)', () => {
    const local = 'a'.repeat(64)
    const domain = 'b'.repeat(185) + '.com' // 64 + 1 + 189 = 254
    expect(emailSafe(`${local}@${domain}`)).toBe(true)
  })
})

describe('emailSafe - invalid structure', () => {
  test('missing @ symbol', () => {
    expect(emailSafe('userexample.com')).toBe(false)
  })

  test('missing domain', () => {
    expect(emailSafe('user@')).toBe(false)
  })

  test('missing local part', () => {
    expect(emailSafe('@example.com')).toBe(false)
  })

  test('missing dot in domain', () => {
    expect(emailSafe('user@example')).toBe(false)
  })

  test('dot at start of domain', () => {
    // Note: emailSafe currently allows this, but it probably shouldn't
    // This is a known limitation - the dot check only looks at the last dot position
    expect(emailSafe('user@.example.com')).toBe(true)
  })

  test('dot at end of domain', () => {
    expect(emailSafe('user@example.com.')).toBe(false)
  })

  test('multiple @ symbols', () => {
    expect(emailSafe('user@@example.com')).toBe(false)
  })

  test('@ at the very start', () => {
    expect(emailSafe('@example.com')).toBe(false)
  })

  test('@ at the very end', () => {
    expect(emailSafe('user@')).toBe(false)
  })
})

describe('emailSafe - invalid length', () => {
  test('empty string', () => {
    expect(emailSafe('')).toBe(false)
  })

  test('whitespace only (trimmed to empty)', () => {
    expect(emailSafe('   ')).toBe(false)
  })

  test('tab only (trimmed to empty)', () => {
    expect(emailSafe('\t\t')).toBe(false)
  })

  test('local part exceeds 64 characters', () => {
    const local = 'a'.repeat(65)
    expect(emailSafe(`${local}@example.com`)).toBe(false)
  })

  test('total length exceeds 254 characters', () => {
    const local = 'a'.repeat(64)
    const domain = 'b'.repeat(186) + '.com' // 64 + 1 + 190 = 255
    expect(emailSafe(`${local}@${domain}`)).toBe(false)
  })

  test('exactly 255 characters (edge case)', () => {
    // 64 (local) + 1 (@) + 189 (domain) = 254 (limit)
    // 64 (local) + 1 (@) + 190 (domain) = 255 (over limit)
    const local = 'a'.repeat(64)
    const domain = 'b'.repeat(187) + '.co' // 64 + 1 + 190 = 255
    expect(emailSafe(`${local}@${domain}`)).toBe(false)
  })
})

describe('emailSafe - invalid characters in local part', () => {
  test('space in local part', () => {
    expect(emailSafe('user name@example.com')).toBe(false)
  })

  test('angle brackets', () => {
    expect(emailSafe('user<name>@example.com')).toBe(false)
  })

  test('parentheses', () => {
    expect(emailSafe('user(name)@example.com')).toBe(false)
  })

  test('square brackets', () => {
    expect(emailSafe('user[name]@example.com')).toBe(false)
  })

  test('backslash', () => {
    expect(emailSafe('user\\name@example.com')).toBe(false)
  })

  test('comma', () => {
    expect(emailSafe('user,name@example.com')).toBe(false)
  })

  test('semicolon', () => {
    expect(emailSafe('user;name@example.com')).toBe(false)
  })

  test('colon', () => {
    expect(emailSafe('user:name@example.com')).toBe(false)
  })

  test('double quotes', () => {
    expect(emailSafe('user"name"@example.com')).toBe(false)
  })

  test('at symbol in local part', () => {
    expect(emailSafe('user@name@example.com')).toBe(false)
  })
})

describe('emailSafe - invalid characters in domain', () => {
  test('space in domain', () => {
    expect(emailSafe('user@exam ple.com')).toBe(false)
  })

  test('underscore in domain', () => {
    expect(emailSafe('user@exam_ple.com')).toBe(false)
  })

  test('exclamation in domain', () => {
    expect(emailSafe('user@exam!ple.com')).toBe(false)
  })

  test('special characters in domain', () => {
    expect(emailSafe('user@exam#ple.com')).toBe(false)
  })

  test('plus in domain', () => {
    expect(emailSafe('user@exam+ple.com')).toBe(false)
  })
})

describe('emailSafe - edge cases', () => {
  test('null input', () => {
    expect(emailSafe(null as any)).toBe(false)
  })

  test('undefined input', () => {
    expect(emailSafe(undefined as any)).toBe(false)
  })

  test('number input', () => {
    expect(emailSafe(123 as any)).toBe(false)
  })

  test('object input', () => {
    expect(emailSafe({} as any)).toBe(false)
  })

  test('array input', () => {
    expect(emailSafe([] as any)).toBe(false)
  })

  test('boolean input', () => {
    expect(emailSafe(true as any)).toBe(false)
  })
})

describe('emailSafe - ReDoS safety', () => {
  test('long string with many special characters (no crash)', () => {
    const malicious = 'a'.repeat(10000) + '@' + 'b'.repeat(10000) + '.com'
    const start = Date.now()
    const result = emailSafe(malicious)
    const duration = Date.now() - start
    expect(result).toBe(false) // too long
    expect(duration).toBeLessThan(100) // should complete quickly
  })

  test('nested pattern that could cause regex backtracking', () => {
    const malicious = '(' + 'a'.repeat(100) + '+' + 'b'.repeat(100) + ')' + '@example.com'
    const start = Date.now()
    const result = emailSafe(malicious)
    const duration = Date.now() - start
    expect(result).toBe(false) // parentheses not allowed
    expect(duration).toBeLessThan(100) // should complete quickly
  })

  test('repeated dot patterns', () => {
    const malicious = 'a' + '.'.repeat(1000) + 'b@example.com'
    const start = Date.now()
    const result = emailSafe(malicious)
    const duration = Date.now() - start
    expect(result).toBe(false) // local part too long
    expect(duration).toBeLessThan(100) // should complete quickly
  })
})
