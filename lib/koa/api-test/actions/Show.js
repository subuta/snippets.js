import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import { generateSeeds } from 'lib/_utils/generateSeed'

export default (props) => {
  let {model, routeConfig, modelConfig} = props
  const seeds = generateSeeds(modelConfig, modelConfig.seeds)

  const seed = _.first(seeds)

  model = pluralize.singular(model)
  const models = pluralize(model)

  const assetions = _.map(seed, (value, key) => {
    return `t.deepEqual(response.body.${key}, ${s.stringify(value)})`
  })

  return build`
    test('show should return ${model}', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .get('/api/${models}/${seed.id}')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      t.is(response.status, 200)
      
      ${assetions}
    })
  `
}
