import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default (props) => {
  let {model, config} = props
  model = pluralize.singular(model)
  const models = pluralize(model)
  return build`
    test('show should return ${model}', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .get('/api/${models}/1')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      t.is(response.status, 200)
      t.deepEqual(response.body.id, 1)
      t.deepEqual(response.body.title, 'Awesome React')
      t.deepEqual(response.body.tags.length, 1)
    })
  `
}
