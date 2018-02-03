import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'
import pathToRegexp from 'path-to-regexp'

export default (RouteConfig, ModelConfig) => {
  let {schema} = ModelConfig

  const {
    tableName
  } = schema

  const model = pluralize.singular(tableName)

  let params = []
  let path = `/${_.snakeCase(tableName)}`
  if (RouteConfig.prefix) {
    path = _.map(pathToRegexp.parse(RouteConfig.prefix), (part) => {
      if (part.name) {
        params.push(part.name)
        return `/\$\{params.${part.name}\}`
      }
      return part
    }).join('')
  }

  const schemaName = `${model}`
  let args = ['id']
  if (!_.isEmpty(params)) {
    args.push('params')
  }

  return build`
    export const show = (${args.join(', ')}) => {
      return request.get(\`${path}/\${id}\`).then(data => normalize(data, ${schemaName}))
    }  
  `
}
