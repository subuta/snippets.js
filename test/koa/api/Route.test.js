import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Route from 'lib/koa/api/Route'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = Route({
    model: 'User',
    config: {}
  })

  const expected = build`
    import Router from 'koa-router'
    import _ from 'lodash'
    
    const Users = new Router()
    
    Users.get('/', async (ctx) => {
      const {User} = ctx.state.models
      let params = {}
    
      /* mat Before index [start] */
      /* mat Before index [end] */
    
      ctx.body = await User.query()
        .eager('')
        .where(params)
    })
    
    Users.get('/:id', async (ctx) => {
      const {User} = ctx.state.models
      let params = {}
    
      /* mat Before show [start] */
      /* mat Before show [end] */
    
      ctx.body = await User.query()
        .eager('')
        .findFirst({...params, id: ctx.params.id})
    })
    
    Users.post('/', async (ctx) => {
      const {User} = ctx.state.models
      const {User} = ctx.request.body
    
      let params = {}
    
      /* mat Before create [start] */
      /* mat Before create [end] */
    
      let response = await User.query()
        .insert({
          ...User,
          ...params
        })
        .eager('')
    
      /* mat After create [start] */
      /* mat After create [end] */
    
      ctx.body = response
    })
    
    Users.put('/:id', async (ctx) => {
      const {User} = ctx.state.models
      const {User} = ctx.request.body
      const {sub} = ctx.state.user
    
      // update specified User.
      const params = {}
    
      /* mat Before update [start] */
      /* mat Before update [end] */
    
      ctx.body = await User.query()
        .update({
          ...User,
          ...params
        })
        .where({id: ctx.params.id})
        .eager('')
    })
    
    Users.delete('/:id', async (ctx) => {
      const {User} = ctx.state.models
      await User.query()
        .delete()
        .where({id: ctx.params.id})
      ctx.body = null
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