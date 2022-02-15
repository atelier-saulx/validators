const isUrlRe =
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/i

const validURL = (str: string): boolean => {
  return isUrlRe.test(str)
}

export const digest =  (payload: string): boolean  => {
  return typeof payload === 'string'
}

export const string =  (payload: string): boolean  => {
  return typeof payload === 'string'
}

export const phone =  (payload: string): boolean  => {
  return typeof payload === 'string' && payload.length < 30
}

export const timestamp = (payload: 'now' | number): boolean  => {
  return (
    payload === 'now' ||
    (typeof payload === 'number' && Number.isInteger(payload))
  )
}

export const url = (payload: string): boolean  => {
  return typeof payload === 'string' && validURL(payload)
}

export const email = (payload: string): boolean  => {
  const re =
    typeof payload === 'string' &&
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(payload.toLowerCase())
} 

export const number = (payload: number): boolean  => {
  return typeof payload === 'number' && !isNaN(payload)
}

export const float = number
export const int = number

export const boolean = (payload: boolean): boolean  => {
  return typeof payload === 'boolean'
}

export const type = string

export const id = (payload: string): boolean  => {
  return typeof payload === 'string' && payload.length < 20
}
