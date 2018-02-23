import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

import Base from './actions/Base'

// route for user.
export default (props) => {
  let {
    model = 'user',
    routeConfig = {}
  } = props

  const {
    eager = '',
  } = routeConfig

  // Ensure naming convention.
  model = pluralize.singular(model)
  const Model = _.upperFirst(model)
  model = _.toLower(pluralize.singular(model))

  const models = s.plural(model)

  const Import = s.import([
    ['koa-router', 'Router'],
    ['lodash', '_'],
  ])

  const ShowRoute = Base(
    {model, path: '/me', method: 'get'},
    build`
      ctx.body = await ctx.state.getCurrentUser()
    `
  )

  const UpdateRoute = Base(
    {model, path: '/me', method: 'put'},
    build`
      const {${model}} = ctx.request.body
      const {sub} = ctx.state.user

      const currentUser = await ctx.state.getCurrentUser()
    
      // check for malicious request.
      ${model}.id = _.get(currentUser, 'id', null)
    
      // findOrCreate specified user.
      // update id with current ${model} in params if specified
      const params = _.pickBy({
        ...${model},
        auth0Id: sub
      }, _.identity)
    
      const opts = {
        relate: true,
        unrelate: true
      }
    
      ctx.body = await ${Model}
        .query()
        .eager('${eager}')
        .upsertGraphAndFetch(params, opts)
    `
  )

  return build`
    ${Import}
    
    const ${model} = new Router({
      prefix: '/${models}'
    })
    
    
    ${ShowRoute}
    
    ${UpdateRoute}
    
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
