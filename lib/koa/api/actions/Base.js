import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import {
  CONTROLLER_ACTIONS
} from 'lib/_utils/getControllerActions'

export default (props, children = []) => {
  let {
    model,
    routeConfig,
    path = '/',
    method = 'get',
    action
  } = props

  const Model = _.upperFirst(pluralize.singular(model))
  model = _.toLower(pluralize.singular(model))

  let middlewares = []

  const needsAuth = (() => {
    if (_.get(routeConfig, 'skipAuth') === true) {
      return []
    }
    return _.difference(CONTROLLER_ACTIONS, _.get(routeConfig, 'skipAuth', []))
  })()

  if (_.includes(needsAuth, action)) {
    middlewares.push('auth')
  }

  middlewares = _.isEmpty(middlewares) ? '' : middlewares.join(',') + ','

  return build`
    ${model}.${method}('${path}', ${middlewares} async (ctx) => {
      const {${Model}} = ctx.state.models
      ${children}
    })
  ` + s.EOL // append EOL to each line.
}
