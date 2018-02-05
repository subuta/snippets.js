import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default (props) => {
  let {model, config} = props
  model = pluralize.singular(model)
  const models = pluralize(model)
  return build`
    test('post should create ${model}', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .post('/api/${models}')
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
}
