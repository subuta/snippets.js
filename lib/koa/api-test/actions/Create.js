import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import generateSeed, { generateSeeds } from 'lib/_utils/generateSeed'

export default (props) => {
  let {model, routeConfig, modelConfig} = props
  const seeds = generateSeeds(modelConfig, modelConfig.seeds)

  // get next seed
  const seed = generateSeed(modelConfig, seeds.length)

  model = pluralize.singular(model)
  const models = pluralize(model)

  const assetions = _.map(seed, (value, key) => {
    return `t.deepEqual(response.body.${key}, ${s.stringify(value)})`
  })

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
          article: ${s.stringify(seed)}
        })
    
      t.is(response.status, 200)
      
      ${assetions}
    })
  `
}
