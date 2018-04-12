import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

const toActionType = (prefix, type, suffix = '') => {
  if (!type) return _.toUpper(_.snakeCase(prefix))
  return _.toUpper(_.snakeCase(`${prefix}_${type}${suffix && '_' + suffix}`))
}

export const ActionTypeDef = function (...args) {
  const ACTION_TYPE = toActionType.apply(this, args)
  return build`
    const ${ACTION_TYPE} = ${s.stringify(ACTION_TYPE)}
  `
}

export default {
  raw: toActionType,
  set: (model) => toActionType('set', pluralize(model)),
  setIds: (model) => toActionType('set', pluralize.singular(model), 'ids'),
  request: (model) => toActionType('request', pluralize(model)),
  failure: (model) => toActionType('request', pluralize(model), 'failure'),
  create: (model) => toActionType('create', pluralize.singular(model)),
  show: (model) => toActionType('show', pluralize.singular(model)),
  all: (model) => toActionType('index', pluralize(model)),
  update: (model) => toActionType('update', pluralize.singular(model)),
  destroy: (model) => toActionType('delete', pluralize.singular(model)),
}
