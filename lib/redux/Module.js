import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import ActionType, { ActionTypeDef } from './ActionType'
import ActionCreator from './ActionCreator'
import Reducer from './Reducer'
import Selector from './Selector'

const createModule = (model) => {
  let { tableName, relations } = model

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
    export ${ActionCreator.set(model)}
    
    // -------------
    // Reducers
    // -------------
    export ${Reducer.entities(model)}
    
    export ${Reducer.ids(model)}
    
    export ${Reducer.requestProgress(model)}
    
    export default combineReducers({
      entities,
      ids,
      requestProgress
    })
    
    // -------------
    // Selectors
    // -------------
    export ${Selector.entities(model)}
    export ${Selector.ids(model)}
    export ${Selector.requestProgress(model)}
    export ${Selector.getAll(model)}
  `
}

export default createModule