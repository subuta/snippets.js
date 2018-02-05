import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default (props) => {
  let {model, config} = props
  model = pluralize.singular(model)
  const models = pluralize(model)
  return build`
    test('delete should delete ${model}', async (t) => {
      const {request, Article} = t.context
    
      let articles  = await Article.query()
      t.deepEqual(articles.length, 1)
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .delete('/api/${models}/1')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      articles = await Article.query()
      t.deepEqual(articles.length, 0)
    
      t.is(response.status, 204)
      t.deepEqual(response.body, {})
    })
  `
}
