import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import AllTest from 'lib/koa/api-test/actions/All'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Index(All) action test', async (t) => {
  const code = AllTest({
    model: 'user',
    config: {}
  })

  const expected = build`
    test('index should list user', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .get('/api/users')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      t.is(response.status, 200)
      t.deepEqual(response.body.length, 1)
    })
  `

  t.is(format(code), format(expected))
})