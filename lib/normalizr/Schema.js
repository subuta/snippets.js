import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import parseRelations from 'lib/_utils/parseRelations'

export default (Models = []) => {
  // omit junction table.
  Models = _.omitBy(Models, { isJunction: true })

  const schemaDefs = _.flatten(_.map(Models, ({schema}) => {
    const {tableName} = schema
    const model = pluralize.singular(_.camelCase(tableName))

    return [
      `export const ${model} = new schema.Entity('${model}')`,
      `export const ${model}List = new schema.Array(${model})`,
      s.EOL
    ]
  }))

  const associations = _.flatten(_.map(Models, (Model) => {
    const {schema} = Model
    const {tableName} = schema
    const model = pluralize.singular(_.camelCase(tableName))

    const relations = _.transform(parseRelations(Model), (result, value, key) => {
      result[key] = pluralize.isPlural(value) ? `[${pluralize.singular(value)}]` : value
    }, {})

    return build`
      ${model}.define(${s.raw(relations)})
    ` + s.EOL
  }))

  let models = _.flatten(_.map(_.keys(Models), (m) => {
    const model = pluralize.singular(m)
    return [
      model,
      `${model}List`
    ]
  }))
  models = _.zipObject(models, models)

  const imports = s.import([
    ['lodash', '_'],
    ['pluralize', 'pluralize'],
    ['src/modules', null, [
      ['fetchEntities']
    ]]
  ])

  return build`
    ${imports}
    import * as normalizr from 'normalizr'
    
    const { schema } = normalizr
    
    ${schemaDefs}
    
    ${associations}
    
    const models = ${s.raw(models)}
    
    // denormalize data using schema.
    export const denormalize = (data, modelName, state) => {
      const schema = models[pluralize.singular(modelName)]
      return normalizr.denormalize(data, schema, fetchEntities(state))
    }
    
    ${s.export('models')}
  `
}
