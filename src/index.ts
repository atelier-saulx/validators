import { passwordEntropy } from './passwordEntropy'

const isUrlRe = new RegExp(
  "(?=.)(?!https?:/(?:$|[^/]))(?!https?:///)(?!https?:[^/])(?:[a-zA-Z][a-zA-Z\\d+-\\.]*:(?:(?:\\/\\/(?:[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:]*@)?(?:\\[(?:(?:(?:[\\dA-Fa-f]{1,4}:){6}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|::(?:[\\dA-Fa-f]{1,4}:){5}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){4}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,1}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){3}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,2}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){2}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,3}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}:(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,4}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,5}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}|(?:(?:[\\dA-Fa-f]{1,4}:){0,6}[\\dA-Fa-f]{1,4})?::)|v[\\dA-Fa-f]+\\.[\\w-\\.~!\\$&'\\(\\)\\*\\+,;=:]+)\\]|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=]{1,255})(?::\\d*)?(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)|\\/(?:[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)?|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*|(?:\\/\\/\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)))(?:\\?[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@\\/\\?]*(?=#|$))?(?:#[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@\\/\\?]*)?",
  'i'
)

const validURL = (str: string): boolean => {
  return isUrlRe.test(str)
}

export const digest = (payload: string): boolean => {
  return typeof payload === 'string'
}

export const string = (payload: string): boolean => {
  return typeof payload === 'string'
}

export const phone = (payload: string): boolean => {
  return typeof payload === 'string' && payload.length < 30
}

export const timestamp = (payload: 'now' | number): boolean => {
  return (
    payload === 'now' ||
    (typeof payload === 'number' && Number.isInteger(payload))
  )
}

export const url = (payload: string): boolean => {
  return typeof payload === 'string' && validURL(payload)
}

export const email = (payload: string): boolean => {
  const re =
    typeof payload === 'string' &&
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(payload.toLowerCase())
}

export const number = (payload: number): boolean => {
  return typeof payload === 'number' && !isNaN(payload)
}

export const float = number

export const int = number

export const boolean = (payload: boolean): boolean => {
  return typeof payload === 'boolean'
}

export const type = (payload: string): boolean => {
  return typeof payload === 'string' && !/\s/.test(payload)
}

export const id = (payload: string): boolean => {
  return (
    typeof payload === 'string' && payload.length < 20 && !/\s/.test(payload)
  )
}

const MINIMUM_PASSWORD_ENTROPY = 50
export const password = (payload: string): boolean => {
  return payload && passwordEntropy(payload) >= MINIMUM_PASSWORD_ENTROPY
}

export const validatePassword = (
  payload: string
): { entropy: number; info: string; valid: boolean } => {
  if (!(typeof payload === 'string'))
    return { entropy: 0, info: 'Not a string', valid: false }
  const entropy = passwordEntropy(payload)
  return {
    entropy,
    valid: entropy >= MINIMUM_PASSWORD_ENTROPY,
    info:
      entropy >= 50 && entropy < 60
        ? 'Weak password'
        : entropy >= 60 && entropy < 70
        ? 'Reasonable password'
        : entropy >= 70 && entropy < 100
        ? 'Good password'
        : entropy >= 100
        ? 'Fantastic password'
        : 'Poor password',
  }
}
