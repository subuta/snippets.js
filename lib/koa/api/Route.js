import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import IndexAction from './actions/All'
import ShowAction from './actions/Show'
import CreateAction from './actions/Create'
import UpdateAction from './actions/Update'
import DeleteAction from './actions/Delete'

import getControllerActions from '../../config/getControllerActions'

export default (props) => {
  let {
    model,
    config
  } = props

  const {
    imports = []
  } = config

  // Ensure naming convention.
  model = pluralize.singular(model)
  const models = pluralize(model)

  const Import = s.import([
    ...imports,
    ['koa-router', 'Router'],
    ['lodash', '_'],
  ])

  const renderAction = (action) => {
    switch (action) {
      case 'index':
        return IndexAction(props)
      case 'show':
        return ShowAction(props)
      case 'create':
        return CreateAction(props)
      case 'update':
        return UpdateAction(props)
      case 'delete':
        return DeleteAction(props)
    }
  }

  const actions = _.map(getControllerActions(config), renderAction)

  return build`
    ${Import}
    
    const ${models} = new Router()
    
    ${actions}
    
    ${s.export(build`
      {
        routes: () => _.cloneDeep(${models}.routes()),
        register: (routers) => {
          /* mat Register [start] */
          /* mat Register [end] */
        }
      }
    `)}
  `
}
