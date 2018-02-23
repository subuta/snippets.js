import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import { generateSeeds } from 'lib/_utils/generateSeed'

export default (props) => {
  let {model, routeConfig, modelConfig} = props
  const seeds = generateSeeds(modelConfig, modelConfig.seeds)

  model = pluralize.singular(model)
  const models = pluralize(model)

  const prefix = routeConfig.prefix || `/${models}`

  return build`
    test('index should list ${model}', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .get('/api${prefix}')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      t.is(response.status, 200)
      t.deepEqual(response.body.length, ${seeds.length})
      t.deepEqual(_.map(response.body, 'id'), ${s.raw(_.map(seeds, 'id'))})
    })
  `
}
