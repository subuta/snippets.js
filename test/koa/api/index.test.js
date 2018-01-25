import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Routes from 'lib/koa/api'

import { Routes as RoutesConfig } from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = Routes(RoutesConfig)

  const expected = build`
    import Router from 'koa-router'
    import _ from 'lodash'
    import pluralize from 'pluralize'
    import koaBody from 'koa-body'
    import auth, {getCurrentUser} from './middlewares/auth'
    import models from './middlewares/models'
    import channel from './channel'
    import comment from './comment'
    import attachment from './attachment'
    import user from './user'

    const api = new Router({
      prefix: '/api'
    })
    
    // register routers to api.
    const registerRouters = (routers) => {
      _.each(routers, (router, name) => {
        router.register && router.register(routers)
        api.use(\`/\${_.snakeCase(pluralize(name))}\`, router.routes())
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
    registerRouters({
      channel,
      comment,
      attachment,
      user
    })
    
    export default api
  `

  t.is(format(code), format(expected))
})