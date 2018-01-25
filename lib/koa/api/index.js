import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'
import pluralize from 'pluralize'

export default (Routes = {}) => {
  const keys = _.map(_.keys(Routes), (r) => pluralize.singular(r))
  const models = _.zip(_.map(keys, (k) => `./${k}`), keys)

  const imports = s.import([
    ['koa-router', 'Router'],
    ['lodash', '_'],
    ['pluralize', 'pluralize'],
    ['koa-body', 'koaBody'],
    ['./middlewares/auth', 'auth', [
      'getCurrentUser'
    ]],
    ['./middlewares/models', 'models'],
    ...models,
  ])

  const Routers = _.zipObject(keys, keys)

  return build`
    ${imports}
   
    const api = new Router({
      prefix: '/api'
    })
    
    // register routers to api.
    const registerRouters = (routers) => {
      _.each(routers, (router, name) => {
        router.register && router.register(routers)
        api.use(\`/\$\{\_.snakeCase(pluralize(name))\}\`, router.routes())
      })
    }
    
    // routers set before auth middleware will not be protected
    // parse body
    api.use(
      koaBody({
        multipart: true
      })
    )
    
    // set jwt middleware
    api.use(auth)
    
    // inject Objection.js models middleware.
    api.use(models)
    
    // inject getCurrentUser to state for ease of use.
    api.use(getCurrentUser)
    
    // routers set after auth middleware will be protected
    registerRouters(${s.raw(Routers)})
    
    export default api

  `
}
