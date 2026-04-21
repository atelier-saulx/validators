const LOCAL_PART_ALLOWED = new Set([
  '.',
  '!',
  '#',
  '$',
  '%',
  '&',
  "'",
  '*',
  '+',
  '/',
  '=',
  '?',
  '^',
  '_',
  '`',
  '{',
  '}',
  '|',
  '~',
  '-',
])

const DOMAIN_ALLOWED = new Set(['.', '-'])

// No allocations and not vulnerable to ReDoS attacks
export const emailSafe = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false
  }

  const len = email.length
  let start = 0
  let end = len

  while (start < end && (email[start] === ' ' || email[start] === '\t')) {
    start++
  }
  while (end > start && (email[end - 1] === ' ' || email[end - 1] === '\t')) {
    end--
  }

  const trimmedLen = end - start

  if (trimmedLen > 254 || trimmedLen === 0) {
    return false
  }

  const atIndex = email.indexOf('@', start)
  if (atIndex < start + 1 || atIndex >= end - 1) {
    return false
  }

  const localPartLen = atIndex - start
  const domainLen = end - atIndex - 1

  if (localPartLen > 64 || localPartLen === 0) {
    return false
  }

  for (let i = start; i < atIndex; i++) {
    const c = email[i]
    const code = c.charCodeAt(0)
    const isAllowed =
      (code >= 97 && code <= 122) ||
      (code >= 65 && code <= 90) ||
      (code >= 48 && code <= 57) ||
      LOCAL_PART_ALLOWED.has(c)
    if (!isAllowed) {
      return false
    }
  }

  if (domainLen === 0) {
    return false
  }

  const domainStart = atIndex + 1
  const dotIndex = email.lastIndexOf('.', end)
  if (dotIndex <= domainStart || dotIndex >= end - 1) {
    return false
  }

  for (let i = domainStart; i < end; i++) {
    const c = email[i]
    const code = c.charCodeAt(0)
    const isAllowed =
      (code >= 97 && code <= 122) ||
      (code >= 65 && code <= 90) ||
      (code >= 48 && code <= 57) ||
      DOMAIN_ALLOWED.has(c)
    if (!isAllowed) {
      return false
    }
  }

  return true
}
