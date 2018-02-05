import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import CreateTest from 'lib/koa/api-test/actions/Create'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Create action test', async (t) => {
  const code = CreateTest({
    model: 'user',
    config: {}
  })

  const expected = build`
    test('post should create user', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .post('/api/users')
        .set('Authorization', \`Bearer \$\{token\}\`)
        .send({
          article: {
            id: 2,
            title: 'Awesome Redux',
            content: 'Hello World'
          }
        })
    
      t.is(response.status, 200)
      t.deepEqual(response.body.id, 2)
    })
  `

  t.is(format(code), format(expected))
})