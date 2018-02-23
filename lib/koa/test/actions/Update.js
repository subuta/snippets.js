import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import {
  generateSeedsWithRelation,
  generateSeed
} from '../../../_utils/generateSeed'
import pathToRegexp from 'path-to-regexp/index'

export default (props) => {
  let {model, routesConfig, modelsConfig} = props

  const modelConfig = modelsConfig[model]
  const routeConfig = routesConfig[model]

  const seeds = generateSeedsWithRelation(model, modelsConfig, modelConfig.seeds)

  // get next seed
  const oldSeed = _.first(seeds)
  let seed = generateSeed(modelConfig, seeds.length)

  // simulate update model
  seed = _.set(seed, 'id', oldSeed.id)

  model = pluralize.singular(model)
  const models = pluralize(model)

  const assetions = _.map(seed, (value, key) => {
    return `t.deepEqual(response.body.${key}, ${s.stringify(value)})`
  })

  let path = `/${models}`
  if (routeConfig.prefix) {
    path = _.map(pathToRegexp.parse(routeConfig.prefix), (part) => {
      if (part.name) {
        return `/${seed[part.name]}`
      }
      return part
    }).join('')
  }

  return build`
    test('update should update ${model}', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .put('/api${path}/${seed.id}')
        .set('Authorization', \`Bearer \$\{token\}\`)
        .send({
          article: ${s.stringify(seed)}
        })
    
      t.is(response.status, 200)
      
      ${assetions}
    })
  ` + s.EOL // append EOL to each line.
}
