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

  let path = `/${_.snakeCase(tableName)}`
  if (RouteConfig.prefix) {
    path = _.map(pathToRegexp.parse(RouteConfig.prefix), (part) => {
      if (part.name) {
        return `/\$\{params.${part.name}\}`
      }
      return part
    }).join('')
  }

  return build`
    export const create = (params) => {
      return request.post(\`${path}\`, ${s.raw({[model]: 'params'})})
    }
  `
}
