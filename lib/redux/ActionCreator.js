import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import createAction from './Action'
import ActionType from 'lib/redux/ActionType'

const set = ({ tableName }) => {
  // ensure naming convention.
  const models = _.camelCase(pluralize(tableName))

  const ACTION_TYPE = ActionType.set(models)
  const name = _.camelCase(ACTION_TYPE)
  const Action = createAction(ACTION_TYPE, tableName)

  return build`
    const ${name} = (${tableName}) => {
      return ${Action}
    }
  `
}

const create = ({ tableName }) => {
  // ensure naming convention.
  const models = _.camelCase(pluralize(tableName))

  const ACTION_TYPE = ActionType.create(models)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(models)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${name} = (params) => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(models)}})
        return api.${models}.create(params).then((data) => {
          dispatch(${setAction}(data))
          return data
        })        
      }
    }
  `
}

const show = ({ tableName }) => {
  // ensure naming convention.
  const models = _.camelCase(pluralize(tableName))

  const ACTION_TYPE = ActionType.request(models)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(models)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${pluralize.singular(name)} = (id) => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(models)}})
        return api.${models}.show(id).then((data) => {
          dispatch(${setAction}(data))
          return data
        })        
      }
    }
  `
}

const all = ({ tableName }) => {
  // ensure naming convention.
  const models = _.camelCase(pluralize(tableName))

  const ACTION_TYPE = ActionType.request(models)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(models)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${name} = () => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(models)}})
        return api.${models}.index().then((data) => {
          dispatch(${setAction}(data))
          return data
        })        
      }
    }
  `
}

const update = ({ tableName }) => {
  // ensure naming convention.
  const models = _.camelCase(pluralize(tableName))

  const ACTION_TYPE = ActionType.update(models)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(models)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${pluralize.singular(name)} = (params, id) => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(models)}})
        return api.${models}.update(params, id).then((data) => {
          dispatch(${setAction}(data))
          return data
        })        
      }
    }
  `
}

const destroy = ({ tableName }) => {
  // ensure naming convention.
  const models = _.camelCase(pluralize(tableName))

  const ACTION_TYPE = ActionType.destroy(models)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(models)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${pluralize.singular(name)} = (id) => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(models)}})
        return api.${models}.destroy(id).then(() => {
          dispatch(${setAction}({}))
        })        
      }
    }
  `
}

export default {
  set,
  create,
  show,
  all,
  update,
  destroy
}