import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default (ModelConfig) => {
  let {schema} = ModelConfig

  const {
    tableName
  } = schema

  const model = pluralize.singular(tableName)
  const schemaName = `${model}List`

  const path = `/${_.snakeCase(tableName)}`

  return build`
    export const index = () => {
      return request.get(\`${path}\`).then(data => normalize(data, ${schemaName}))
    }
  `
}
