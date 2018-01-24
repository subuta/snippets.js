import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import ActionType, { ActionTypeDef } from './ActionType'
import ActionCreator from './ActionCreator'
import Reducer from './Reducer'
import Selector from './Selector'
import getControllerActions from '../config/getControllerActions'

const createModule = (RouteConfig, ModelConfig) => {
  let { tableName, relations } = ModelConfig

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
      case 'delete':
        return ActionCreator.destroy(ModelConfig) + s.EOL
    }
  }

  const actions = _.map(keys, renderAction)

  // ensure naming convention.
  tableName = _.camelCase(pluralize(tableName))

  let importsFromRelations = s.import(_.keys(relations).map(r => {
    // ensure naming convention.
    r = _.camelCase(pluralize(r))
    return [`./${r}`,  null, [
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
    ['src/utils/schema', null, [
      'denormalize'
    ]],
    ['src/utils/api', 'api']
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
    
    // -------------
    // ActionCreators
    // -------------
    export ${ActionCreator.set(ModelConfig)}
    
    ${_.map(actions, (action) => `export ${action}`)}
    
    // -------------
    // Reducers
    // -------------
    export ${Reducer.entities(ModelConfig)}
    
    export ${Reducer.ids(ModelConfig)}
    
    export ${Reducer.requestProgress(ModelConfig)}
    
    export default combineReducers({
      entities,
      ids,
      requestProgress
    })
    
    // -------------
    // Selectors
    // -------------
    export ${Selector.entities(ModelConfig)}
    export ${Selector.ids(ModelConfig)}
    export ${Selector.requestProgress(ModelConfig)}
    export ${Selector.getAll(ModelConfig)}
  `
}

export default createModule