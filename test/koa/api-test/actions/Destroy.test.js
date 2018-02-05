import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import DestroyTest from 'lib/koa/api-test/actions/Destroy'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Destroy action test', async (t) => {
  const code = DestroyTest({
    model: 'user',
    config: {}
  })

  const expected = build`
    test('delete should delete user', async (t) => {
      const {request, Article} = t.context
      
      let articles  = await Article.query()
      t.deepEqual(articles.length, 1)
      
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
      
      const response = await request
        .delete('/api/users/1')
        .set('Authorization', \`Bearer \$\{token\}\`)
      
      articles = await Article.query()
      t.deepEqual(articles.length, 0)
      
      t.is(response.status, 204)
      t.deepEqual(response.body, {})
    })

  `

  t.is(format(code), format(expected))
})