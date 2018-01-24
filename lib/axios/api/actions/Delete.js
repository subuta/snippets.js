import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default (ModelConfig) => {
  let {schema} = ModelConfig

  const {
    tableName
  } = schema

  const model = pluralize.singular(tableName)
  const path = `/${_.snakeCase(tableName)}`

  return build`
    export const destroy = (id) => {
      return request.delete(\`${path}/\${id}\`)
    }
  `
}
