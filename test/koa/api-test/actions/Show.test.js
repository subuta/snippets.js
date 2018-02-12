import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import ShowTest from 'lib/koa/api-test/actions/Show'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Show action test', async (t) => {
  const code = ShowTest({
    model: 'user',
    config: {}
  })

  const expected = build`
    test('show should return user', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .get('/api/users/1')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      t.is(response.status, 200)
      t.deepEqual(response.body.id, 1)
      t.deepEqual(response.body.title, 'Awesome React')
      t.deepEqual(response.body.tags.length, 1)
    })
  `

  t.is(format(code), format(expected))
})