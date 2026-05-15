
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PostcodesioSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PostcodesioSDK.test()
    equal(null !== testsdk, true)
  })

})
