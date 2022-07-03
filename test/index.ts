import test from 'ava'
import * as validators from '../src'

test('validators', async (t) => {
  const aNumber = 10
  t.true(validators.number(aNumber))
  t.true(validators.float(aNumber))
  t.true(validators.int(aNumber))

  const aString = 'hello this is a long string hello what is wrong yes'
  t.false(validators.id(aString))
  t.true(validators.string(aString))
  t.false(validators.type(aString))

  const id = 'flap10213312'
  t.true(validators.id(id))
  t.true(validators.type(id))

  const url = 'wss://flap.com'
  t.true(validators.url(url))

  const email = 'jim+hello@saulx.com'
  t.true(validators.email(email))
})

test('password validators', async (t) => {
  t.false(validators.password('monkey'))
  t.false(validators.password('123'))
  t.false(validators.password('password'))
  t.false(validators.validatePassword('password').valid)

  t.true(validators.password('Schaap99!'))
  t.true(validators.validatePassword('Schaap99!').valid)
})
