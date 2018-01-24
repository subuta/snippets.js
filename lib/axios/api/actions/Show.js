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
  const schemaName = `${model}`

  return build`
    export const show = (id) => {
      return request.get(\`${path}/\${id}\`).then(data => normalize(data, ${schemaName}))
    }  
  `
}
