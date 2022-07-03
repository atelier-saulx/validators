// Based on https://github.com/autonomoussoftware/fast-password-entropy

const calcEntropy = (charset: number, length: number) =>
  Math.round((length * Math.log(charset)) / Math.LN2)

type CharacterSet = {
  name: string
  re: RegExp
  length: number
}
const stdCharsets: CharacterSet[] = [
  {
    name: 'lowercase',
    re: /[a-z]/, // abcdefghijklmnopqrstuvwxyz
    length: 26,
  },
  {
    name: 'uppercase',
    re: /[A-Z]/, // ABCDEFGHIJKLMNOPQRSTUVWXYZ
    length: 26,
  },
  {
    name: 'numbers',
    re: /[0-9]/, // 1234567890
    length: 10,
  },
  {
    name: 'symbols',
    re: /[^a-zA-Z0-9]/, //  !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~ (and any other)
    length: 33,
  },
]

const calcCharsetLengthWith = (charsets: CharacterSet[]) => (payload: string) =>
  charsets.reduce(
    (length, charset) =>
      length + (charset.re.test(payload) ? charset.length : 0),
    0
  )

const calcCharsetLength = calcCharsetLengthWith(stdCharsets)

export const passwordEntropy = (payload: string) =>
  payload ? calcEntropy(calcCharsetLength(payload), payload.length) : 0
