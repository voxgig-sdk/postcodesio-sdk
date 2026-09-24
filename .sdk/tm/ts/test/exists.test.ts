
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PostcodesioSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PostcodesioSDK.test()
    equal(testsdk instanceof PostcodesioSDK, true,
      'PostcodesioSDK.test() must return a client synchronously')
  })

})
