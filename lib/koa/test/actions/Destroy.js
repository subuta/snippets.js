import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import {
  generateSeedsWithRelation
} from '../../../_utils/generateSeed'
import pathToRegexp from 'path-to-regexp/index'

export default (props) => {
  let {model, routesConfig, modelsConfig} = props

  const modelConfig = modelsConfig[model]
  const routeConfig = routesConfig[model]

  const seeds = generateSeedsWithRelation(model, modelsConfig, modelConfig.seeds)

  const seed = _.first(seeds)

  const Model = s.modelName(model)

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

  return build`
    test('delete should delete ${model}', async (t) => {
      const {request, ${Model}} = t.context
    
      let ${models}  = await ${Model}.query()
      t.deepEqual(${models}.length, ${seeds.length})
    
      // mock jwks
      const token = createToken(privateKey, '123', currentUser)
      jwksEndpoint('http://localhost', [{pub: publicKey, kid: '123'}])
    
      const response = await request
        .delete('/api${path}/${seed.id}')
        .set('Authorization', \`Bearer \$\{token\}\`)
    
      ${models} = await ${Model}.query()
      t.deepEqual(${models}.length, ${seeds.length - 1})
    
      t.is(response.status, 204)
      t.deepEqual(response.body, {})
    })
  ` + s.EOL // append EOL to each line.
}
