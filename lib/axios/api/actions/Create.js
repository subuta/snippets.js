import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default (ModelConfig) => {
  let {schema} = ModelConfig

  const {
    tableName
  } = schema

  const model = pluralize.singular(tableName)
  const schemaName = `${model}`

  const path = `/${_.snakeCase(tableName)}`

  return build`
    export const create = (params) => {
      return request.post(\`${path}\`, ${s.raw({[model]: 'params'})}).then(data => normalize(data, ${schemaName}))
    }
  `
}
