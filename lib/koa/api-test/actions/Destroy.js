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
    test('delete should delete ${model}', async (t) => {
      const {request, Article} = t.context
    
      let articles  = await Article.query()
      t.deepEqual(articles.length, ${seeds.length})
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .delete('/api/${models}/${seed.id}')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      articles = await Article.query()
      t.deepEqual(articles.length, ${seeds.length - 1})
    
      t.is(response.status, 204)
      t.deepEqual(response.body, {})
    })
  `
}
