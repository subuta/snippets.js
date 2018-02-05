import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import UpdateTest from 'lib/koa/api-test/actions/Update'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Update action test', async (t) => {
  const code = UpdateTest({
    model: 'user',
    config: {}
  })

  const expected = build`
    test('update should update user', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .put('/api/users/1')
        .set('Authorization', \`Bearer \$\{token\}\`)
        .send({
          article: {
            title: 'Awesome Redux 2'
          }
        })
    
      t.is(response.status, 200)
      t.deepEqual(response.body.id, 1)
      t.deepEqual(response.body.title, 'Awesome Redux 2')
      t.deepEqual(response.body.tags[0].label, 'react')
    })

  `

  t.is(format(code), format(expected))
})