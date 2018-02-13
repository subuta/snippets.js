import _ from 'lodash'
import pluralize from 'pluralize'

export default (config = {}) => {
  const { schema } = config

  const relations = _.transform(schema.relations, (result, value, key) => {
    let relatedModel = null;
    if (value.belongsTo) {
      relatedModel = pluralize.singular(_.toLower(value.belongsTo))
    } else if (value.hasOne) {
      relatedModel = pluralize.singular(_.toLower(value.hasOne))
    } else if (value.hasMany) {
      relatedModel = pluralize(_.toLower(value.hasMany))
    } else if (value.hasAndBelongsToMany) {
      relatedModel = pluralize(_.toLower(value.hasAndBelongsToMany))
    }
    result[key] = relatedModel
  }, {})

  return relations
}
