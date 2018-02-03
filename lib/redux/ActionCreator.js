import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import createAction from './Action'
import ActionType from 'lib/redux/ActionType'

const set = ({schema}) => {
  const {tableName} = schema
  // ensure naming convention.
  const model = _.camelCase(pluralize.singular(tableName))

  const ACTION_TYPE = ActionType.set(model)
  const name = _.camelCase(ACTION_TYPE)
  const Action = createAction(ACTION_TYPE, tableName)

  return build`
    const ${name} = (${tableName}) => {
      return ${Action}
    }
  `
}

const create = ({schema}) => {
  const {tableName} = schema

  // ensure naming convention.
  const model = _.camelCase(pluralize.singular(tableName))

  const ACTION_TYPE = ActionType.create(model)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(model)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${name} = (params) => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(model)}})
        return api.${model}.create(params).then((data) => {
          /* mat Create data transform [start] */
          /* mat Create data transform [end] */
          dispatch(${setAction}(normalize(data, ${model})))
          return data
        })        
      }
    }
  `
}

const show = ({schema}) => {
  const {tableName} = schema

  // ensure naming convention.
  const model = _.camelCase(pluralize.singular(tableName))

  const ACTION_TYPE = ActionType.request(model)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(model)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${pluralize.singular(name)} = (id) => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(model)}})
        return api.${model}.show(id).then((data) => {
          /* mat Show data transform [start] */
          /* mat Show data transform [end] */
          dispatch(${setAction}(normalize(data, ${model})))
          return data
        })        
      }
    }
  `
}

const all = ({schema}) => {
  const {tableName} = schema

  // ensure naming convention.
  const model = _.camelCase(pluralize.singular(tableName))

  const ACTION_TYPE = ActionType.request(model)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(model)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${name} = () => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(model)}})
        return api.${model}.index().then((data) => {
          /* mat Index data transform [start] */
          /* mat Index data transform [end] */
          dispatch(${setAction}(normalize(data, ${model}List)))
          return data
        })        
      }
    }
  `
}

const update = ({schema}) => {
  const {tableName} = schema

  // ensure naming convention.
  const model = _.camelCase(pluralize.singular(tableName))

  const ACTION_TYPE = ActionType.update(model)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(model)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${pluralize.singular(name)} = (params, id) => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(model)}})
        return api.${model}.update(params, id).then((data) => {
          /* mat Update data transform [start] */
          /* mat Update data transform [end] */
          dispatch(${setAction}(normalize(data, ${model})))
          return data
        })        
      }
    }
  `
}

const destroy = ({schema}) => {
  const {tableName} = schema

  // ensure naming convention.
  const model = _.camelCase(pluralize.singular(tableName))

  const ACTION_TYPE = ActionType.destroy(model)
  const name = _.camelCase(ACTION_TYPE)

  const SET_ACTION_TYPE = ActionType.set(model)
  const setAction = _.camelCase(SET_ACTION_TYPE)

  return build`
    const ${pluralize.singular(name)} = (id) => {
      return (dispatch) => {
        dispatch({type: ${ActionType.request(model)}})
        return api.${model}.destroy(id).then(() => {
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