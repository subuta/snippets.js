import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import IndexAction from './actions/All'
import ShowAction from './actions/Show'
import CreateAction from './actions/Create'
import UpdateAction from './actions/Update'
import DestroyAction from './actions/Destroy'

import getControllerActions from 'lib/_utils/getControllerActions'

export default (props) => {
  let {
    model,
    routeConfig
  } = props

  const {
    imports = []
  } = routeConfig

  // Ensure naming convention.
  model = pluralize.singular(model)
  const models = pluralize(model)

  const Import = s.import([
    ...imports,
    ['koa-router', 'Router'],
    ['lodash', '_'],
    ['src/api/middlewares/auth', null, [
      ['authenticate', 'auth']
    ]]
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
      case 'destroy':
        return DestroyAction(props)
    }
  }

  const actions = _.map(getControllerActions(routeConfig), renderAction)

  const prefix = routeConfig.prefix || `/${models}`

  return build`
    ${Import}
    
    /* mat Custom imports [start] */
    /* mat Custom imports [end] */
    
    const ${model} = new Router({
      prefix: ${s.stringify(prefix)}
    })
    
    ${actions}
    
    /* mat Custom actions [start] */
    /* mat Custom actions [end] */
    
    ${s.export(build`
      {
        routes: () => _.cloneDeep(${model}.routes()),
        register: (routers) => {
          /* mat Register [start] */
          /* mat Register [end] */
        }
      }
    `)}
  `
}
