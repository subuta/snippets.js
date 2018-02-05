import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default (props) => {
  let {model, config} = props
  model = pluralize.singular(model)
  const models = pluralize(model)
  return build`
    test('update should update ${model}', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .put('/api/${models}/1')
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
}
