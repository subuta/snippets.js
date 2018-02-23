import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import { generateSeedsWithRelation } from 'lib/_utils/generateSeed'
import pathToRegexp from 'path-to-regexp'

export default (props) => {
  let {model, routesConfig, modelsConfig} = props

  const routeConfig = routesConfig[model]
  const modelConfig = modelsConfig[model]

  let seeds = generateSeedsWithRelation(model, modelsConfig, modelConfig.seeds)
  const seed = _.first(seeds)

  model = pluralize.singular(model)
  const models = pluralize(model)

  let filters = {}
  let path = `/${models}`
  if (routeConfig.prefix) {
    path = _.map(pathToRegexp.parse(routeConfig.prefix), (part) => {
      if (part.name) {
        filters[part.name] = seed[part.name]
        return `/${seed[part.name]}`
      }
      return part
    }).join('')
  }

  seeds = _.filter(seeds, filters)

  return build`
    test('index should list ${model}', async (t) => {
      const {request} = t.context
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .get('/api${path}')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      t.is(response.status, 200)
      t.deepEqual(response.body.length, ${seeds.length})
      t.deepEqual(_.map(response.body, 'id').sort(), ${s.raw(_.map(seeds, 'id').sort())})
    })
  ` + s.EOL // append EOL to each line.
}
