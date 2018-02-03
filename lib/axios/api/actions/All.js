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
  const schemaName = `${model}List`

  let params = []
  let path = `/${_.snakeCase(tableName)}`
  if (RouteConfig.prefix) {
    path = _.map(pathToRegexp.parse(RouteConfig.prefix), (part) => {
      if (part.name) {
        params.push(part.name)
        return `/\$\{${part.name}\}`
      }
      return part
    }).join('')
  }

  params = !_.isEmpty(params) ? [`const ${s.raw(_.zipObject(params, params))} = params`] : []

  return build`
    export const index = (${!_.isEmpty(params) ? 'params' : ''}) => {
      ${params}
      return request.get(\`${path}\`).then(data => normalize(data, ${schemaName}))
    }
  `
}
