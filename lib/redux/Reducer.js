import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

import ActionType from './ActionType'
import pluralize from 'pluralize'

export const entities = ({ tableName, relations }) => {
  // ensure naming convention
  const name = _.camelCase('entities')
  const model = _.camelCase(pluralize.singular(tableName))

  // construct actionTypes based on relations
  let actionTypes = _.keys(relations).map(r => ActionType.set(_.camelCase(pluralize.singular(r))))
  actionTypes = _.uniq([ActionType.set(model), ...actionTypes])
  actionTypes = actionTypes.map(at => `action.type === ${at}`).join(' || ')

  return build`
    const ${name} = (state = {}, action) => {
      if (${actionTypes}) {
        return {...state, ...action.payload.entities.${model}}
      }
      return state
    }
  `
}

export const ids = ({ tableName }) => {
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

export const requestProgress = ({ tableName }) => {
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
  requestProgress
}