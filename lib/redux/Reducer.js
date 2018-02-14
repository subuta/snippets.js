import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

import ActionType from './ActionType'
import pluralize from 'pluralize'
import parseRelations from 'lib/_utils/parseRelations'

export const entities = (Model) => {
  const {schema} = Model
  const {tableName} = schema
  // ensure naming convention
  const name = _.camelCase('entities')
  const model = _.camelCase(pluralize.singular(tableName))

  return build`
    const ${name} = (state = {}, action) => {
      if (_.get(action, ['payload', 'entities', '${model}'])) {
        return {...state, ...action.payload.entities.${model}}
      }
      return state
    }
  `
}

export const ids = ({schema}) => {
  const {tableName} = schema
  // ensure naming convention
  const name = _.camelCase('ids')
  const model = _.camelCase(tableName)

  return build`
    const ${name} = (state = [], action) => {
      if (action.type === ${ActionType.set(model)}) {
        if (_.isArray(action.payload.result)) {
          return _.uniq([...state, ...action.payload.result])
        }
        return _.uniq([...state, action.payload.result])
      }
      return state
    }
  `
}

export const isRequestProgress = ({schema}) => {
  const {tableName} = schema
  // ensure naming convention
  const model = _.camelCase(tableName)

  return build`
    const isRequestProgress = (state = false, action) => {
      if (action.type === ${ActionType.request(model)}) {
        return true
      } else if (action.type === ${ActionType.set(model)} ||
                 action.type === ${ActionType.failure(model)}) {
        return false
      }
      return state
    }
  `
}

export default {
  entities,
  ids,
  isRequestProgress
}
