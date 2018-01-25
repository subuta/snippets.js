import { build, format, snippets as s, EOL } from 'bld.js'
import pluralize from 'pluralize'
import _ from 'lodash'

import getControllerActions from '../../config/getControllerActions'
import UpdateAction from './actions/Update'
import ShowAction from './actions/Show'
import DestroyAction from './actions/Destroy'
import IndexAction from './actions/All'
import CreateAction from './actions/Create'

export default (RouteConfig, ModelConfig) => {
  const {
    schema
  } = ModelConfig

  const {
    tableName
  } = schema

  const renderAction = (action) => {
    switch (action) {
      case 'index':
        return IndexAction(ModelConfig) + s.EOL
      case 'show':
        return ShowAction(ModelConfig) + s.EOL
      case 'create':
        return CreateAction(ModelConfig) + s.EOL
      case 'update':
        return UpdateAction(ModelConfig) + s.EOL
      case 'destroy':
        return DestroyAction(ModelConfig) + s.EOL
    }
  }

  const keys = getControllerActions(RouteConfig)
  const exports = _.zipObject(keys, keys)

  const actions = _.map(keys, renderAction)

  const model = pluralize.singular(tableName)
  const modelSchema = `${model}`
  const modelListSchema = `${modelSchema}List`

  const imports = s.import([
    ['lodash', '_'],
    ['src/utils/request', 'request'],
    ['normalizr', null, [
      ['normalize']
    ]],
    ['src/utils/schema', null, [
      [modelSchema],
      [modelListSchema],
    ]]
  ])

  return build`
    ${imports}
    
    ${actions}
    
    /* mat Custom action [start] */
    /* mat Custom action [end] */
    
    let actions = ${s.raw(exports)}
    
    /* mat Custom exports [start] */
    /* mat Custom exports [end] */
    
    ${s.export('actions')}
  `
}
