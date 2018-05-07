import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import { generateSeedsWithRelation } from '../../../_utils/generateSeed'
import pathToRegexp from 'path-to-regexp/index'

export default (props) => {
  let {model, routesConfig, modelsConfig} = props

  const modelConfig = modelsConfig[model]
  const routeConfig = routesConfig[model]

  const {schema} = modelConfig

  const seeds = generateSeedsWithRelation(model, modelsConfig, modelConfig.seeds)
  let seed = _.first(seeds)

  if (schema.visible) {
    seed = _.pick(seed, schema.visible)
  } else if (schema.hidden) {
    seed = _.omit(seed, schema.hidden)
  }

  model = pluralize.singular(model)
  const models = pluralize(model)

  let path = `/${models}`
  if (routeConfig.prefix) {
    path = _.map(pathToRegexp.parse(routeConfig.prefix), (part) => {
      if (part.name) {
        return `/${seed[part.name]}`
      }
      return part
    }).join('')
  }

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
        .get('/api${path}/${seed.id}')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      t.is(response.status, 200)
      
      ${assetions}
    })
  ` + s.EOL // append EOL to each line.
}
