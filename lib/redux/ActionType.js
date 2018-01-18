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
  request: (model) => toActionType('request', pluralize(model)),
  failure: (model) => toActionType('request', pluralize(model), 'failure')
}
