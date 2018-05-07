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
    ['src/api/middlewares/auth', null, [
      ['authenticate', 'auth']
    ]]
  ])

  const ShowRoute = Base(
    {model, routeConfig, path: '/me', method: 'get', action: 'show'},
    build`
      ctx.body = await ctx.state.getCurrentUser()
    `
  )

  const UpdateRoute = Base(
    {model, routeConfig, path: '/me', method: 'put', action: 'update'},
    build`
      const {${model}} = ctx.request.body
      const {sub} = ctx.state.user
      const protectedFields = ['id', 'isAdmin', 'auth0Id']

      const currentUser = await ctx.state.getCurrentUser()
    
      // findOrCreate specified user.
      // update id with current ${model} in params if specified
      let params = {
        ..._.omit(${model}, protectedFields),
        auth0Id: sub
      }
      
      if (_.get(currentUser, 'isAdmin', false)) {
        params['isAdmin'] = true
      }
    
      ctx.body = await ${Model}
        .query()
        .eager('${eager}')
        .patchAndFetchById(currentUser.id, params)
    `
  )

  const CreateRoute = Base(
    {model, routeConfig, path: '/me', method: 'post', action: 'create'},
    build`
      const {${model}} = ctx.request.body
      const {sub} = ctx.state.user
      const protectedFields = ['id', 'isAdmin']

      let params = {}
      
      let found = await ${Model}.query()
        .eager('${eager}')
        .findFirst({auth0Id: sub})
    
      // create if not exists.
      if (!found) {
        // findOrCreate specified user.
        // update id with current ${model} in params if specified
        let params = _.omit({
          ...${model},
          auth0Id: sub
        }, protectedFields)
        
        /* mat Before create [start] */
        /* mat Before create [end] */
        
        found = await ${Model}
          .query()
          .insert(params)
          .eager('${eager}')
          
        /* mat After create [start] */
        /* mat After create [end] */
      }
      
      ctx.body = found
    `
  )

  return build`
    ${Import}
    
    const ${model} = new Router({
      prefix: '/${models}'
    })
    
    
    ${ShowRoute}
    
    ${UpdateRoute}
    
    ${CreateRoute}
    
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
