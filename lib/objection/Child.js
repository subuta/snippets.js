import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default ({model, config}, children = []) => {
  const {
    schema = {}
  } = config

  const Model = _.upperFirst(pluralize.singular(_.toLower(model)))

  const imports = s.import([
    ['./Model', 'Model'],
    ['lodash', '_']
  ])

  const parseSchema = (schema) => {
    // Expects schema has following keys.
    // tableName = will transform to Model's tableName
    // required = will transform to Model's jsonSchema
    // properties = will transform to Model's jsonSchema
    // relations = will transform to Model's relationMappings
    let {
      tableName,
      required,
      properties,
      relations
    } = schema

    // ensure naming convention.
    const model = pluralize.singular(_.toLower(tableName))
    const models = pluralize(model)
    const Model = _.upperFirst(_.camelCase(model))

    const parseRelation = (relation) => _.transform(relation, (results, value, key) => {
      if (key === 'morphAs') {
        const morphType = s.camelCase(`${value}Type`)
        results['filter'] = {
          [morphType]: s.stringify(Model)
        }
        results['beforeInsert'] = build`
          (model) => {
            model.${morphType} = ${s.stringify(Model)}
          }
        `
        return undefined
      }

      // pass-through
      if (key === 'join') {
        results[key] = s.stringify(value)
        return undefined
      }

      const relatedModel = pluralize.singular(_.toLower(value))
      const RelatedModel = _.upperFirst(relatedModel)

      results['modelClass'] = `models.${RelatedModel}`
      switch (key) {
        case 'belongsTo':
          results['relation'] = 'Model.BelongsToOneRelation'
          break
        case 'hasOne':
          results['relation'] = 'Model.HasOneRelation'
          break
        case 'hasMany':
          results['relation'] = 'Model.HasManyRelation'
          break
        case 'hasAndBelongsToMany':
          results['relation'] = 'Model.ManyToManyRelation'
          break
      }
    }, {})

    const relationMappings = _.transform(relations, (results, value, key) => {
      results[key] = parseRelation(value)
    }, {})

    const jsonSchema = {
      title: s.stringify(Model),
      $id: s.stringify(`http://sub-labo.com/schemas/${model}.json`),
      type: s.stringify('object'),
      required: s.stringify(required),
      properties: s.stringify(properties)
    }

    return {
      tableName: models,
      relationMappings,
      jsonSchema
    }
  }

  let {
    tableName,
    relationMappings,
    jsonSchema
  } = parseSchema(schema)

  let {
    properties,
    visible,
    hidden
  } = schema

  const booleanProps = _.map(_.pickBy(properties, {type: 'boolean'}), (v, k) => {
    return `
      if (_.isNumber(parseInt(json['${k}']))) {
        json['${k}'] = !!json['${k}']
      }
    ` + s.EOL
  })

  return build`
    ${imports}
    
   
    ${s.export(build`
      class ${Model} extends Model {
        // SEE: https://github.com/Vincit/objection.js/issues/825
        $parseDatabaseJson(db) {
          // Remember to call the super class's implementation.
          const json = super.$parseDatabaseJson(db);
          ${booleanProps}
          return json
        }
        
        $formatDatabaseJson(json) {
          return super.$formatDatabaseJson(json);
        }
      
        static register = (models) => {
          // then define relationMappings.
          ${Model}.relationMappings = ${s.raw(relationMappings)}
        }
      
        static tableName = '${tableName}'
        
        static jsonSchema = ${s.raw(jsonSchema)}
        
        ${visible && build`
          static get visible() {
            return ${s.stringify(visible)}
          }
        `}
        
        ${hidden && build`
          static get hidden() {
            return ${s.stringify(hidden)}
          }
        `}
        
        /* mat Custom methods [start] */
        /* mat Custom methods [end] */
      }
    `)}
  `
}
