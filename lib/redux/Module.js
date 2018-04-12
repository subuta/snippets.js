import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import ActionType, { ActionTypeDef } from './ActionType'
import ActionCreator from './ActionCreator'
import Reducer from './Reducer'
import Selector from './Selector'
import getControllerActions from 'lib/_utils/getControllerActions'
import parseRelations from 'lib/_utils/parseRelations'

const createModule = (RouteConfig, ModelConfig) => {
  const {
    schema
  } = ModelConfig
  let {tableName} = schema

  const keys = getControllerActions(RouteConfig)

  const renderAction = (action) => {
    switch (action) {
      case 'index':
        return ActionCreator.all(ModelConfig) + s.EOL
      case 'show':
        return ActionCreator.show(ModelConfig) + s.EOL
      case 'create':
        return ActionCreator.create(ModelConfig) + s.EOL
      case 'update':
        return ActionCreator.update(ModelConfig) + s.EOL
      case 'destroy':
        return ActionCreator.destroy(ModelConfig) + s.EOL
    }
  }

  const actions = _.map(keys, renderAction)

  // ensure naming convention.
  tableName = _.camelCase(pluralize(tableName))
  const model = pluralize.singular(tableName)

  const relations = parseRelations(ModelConfig)

  let importsFromRelations = s.import(_.map(_.values(relations), (r) => {
    // ensure naming convention.
    r = _.camelCase(pluralize.singular(r))
    return [`./${r}`, null, [
      ActionType.set(r)
    ]]
  }))

  const imports = s.import([
    ['lodash', '_'],
    ['redux', null, [
      'combineReducers'
    ]],
    ['reselect', null, [
      'createSelector'
    ]],
    ['normalizr', null, [
      ['normalize']
    ]],
    ['src/views/utils/schema', null, [
      [model],
      [`${model}List`],
      'denormalize'
    ]],
    ['src/views/utils/api', 'api']
  ])

  return build`
    ${imports}
    
    ${importsFromRelations}
    
    // -------------
    // Constants
    // -------------
    export ${ActionTypeDef(ActionType.request(tableName))}
    export ${ActionTypeDef(ActionType.failure(tableName))}
    export ${ActionTypeDef(ActionType.set(tableName))}
    export ${ActionTypeDef(ActionType.setIds(tableName))}
    
    /* mat Custom constants [start] */
    /* mat Custom constants [end] */
    
    // -------------
    // ActionCreators
    // -------------
    export ${ActionCreator.set(ModelConfig)}
    
    export ${ActionCreator.setIds(ModelConfig)}
    
    ${_.map(actions, (action) => `export ${action}`)}
    
    /* mat Custom actionCreators [start] */
    /* mat Custom actionCreators [end] */
    
    // -------------
    // Reducers
    // -------------
    export ${Reducer.entities(ModelConfig)}
    
    export ${Reducer.ids(ModelConfig)}
    
    export ${Reducer.isRequestProgress(ModelConfig)}
    
    let reducers = {
      entities,
      ids,
      isRequestProgress
    }
    
    /* mat Custom reducers [start] */
    /* mat Custom reducers [end] */
    
    export default combineReducers(reducers)
    
    // -------------
    // Selectors
    // -------------
    export ${Selector.entities(ModelConfig)}
    export ${Selector.ids(ModelConfig)}
    export ${Selector.isRequestProgress(ModelConfig)}
    export ${Selector.getAll(ModelConfig)}
    
    /* mat Custom selectors [start] */
    /* mat Custom selectors [end] */
  `
}

export default createModule
