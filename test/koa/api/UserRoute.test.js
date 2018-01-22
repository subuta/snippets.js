import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import UserRoute from 'lib/koa/api/UserRoute'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa UserRoute', async (t) => {
  const code = UserRoute({
    model: 'User',
    config: {}
  })

  const expected = build`
    import Router from 'koa-router'
    import _ from 'lodash'
    
    const Users = new Router()
    
    Users.get('/me', async (ctx) => {
      const {User} = ctx.state.models
      ctx.body = await ctx.state.getCurrentUser()
    })
    
    Users.put('/me', async (ctx) => {
      const {User} = ctx.state.models
      const {User} = ctx.request.body
      const {sub} = ctx.state.user
    
      // findOrCreate specified user.
      // update id with current user in params if specified
      const params = {...User, auth0Id: sub}
      ctx.body = await User.query()
        .eager('')
        .findOrCreate({where: {auth0Id: sub}, defaults: params})
    })
    
    export default {
      routes: () => _.cloneDeep(Users.routes()),
      register: (routers) => {
        /* mat Register [start] */
        /* mat Register [end] */
      }
    }
  `

  t.is(format(code), format(expected))
})