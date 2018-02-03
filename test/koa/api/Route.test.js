import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Route from 'lib/koa/api/Route'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = Route({
    model: 'user',
    config: {}
  })

  const expected = build`
    import Router from 'koa-router'
    import _ from 'lodash'
    
    const user = new Router({
      prefix: '/users'
    })
    
    user.get('/', async (ctx) => {
      const {User} = ctx.state.models
      let params = {}
    
      /* mat Before index [start] */
      /* mat Before index [end] */
    
      ctx.body = await User.query()
        .eager('')
        .where(params)
    })
    
    user.get('/:id', async (ctx) => {
      const {User} = ctx.state.models
      let params = {}
    
      /* mat Before show [start] */
      /* mat Before show [end] */
    
      ctx.body = await User.query()
        .eager('')
        .findFirst({...params, id: ctx.params.id})
    })
    
    user.post('/', async (ctx) => {
      const {User} = ctx.state.models
      const {user} = ctx.request.body
    
      let params = {}
    
      /* mat Before create [start] */
      /* mat Before create [end] */
    
      let response = await User.query()
        .insert({
          ...user,
          ...params
        })
        .eager('')
    
      /* mat After create [start] */
      /* mat After create [end] */
    
      ctx.body = response
    })
    
    user.put('/:id', async (ctx) => {
      const {User} = ctx.state.models
      const {user} = ctx.request.body
      const {sub} = ctx.state.user
    
      // update specified user.
      const params = {}
    
      /* mat Before update [start] */
      /* mat Before update [end] */
    
      ctx.body = await User.query()
        .update({
          ...user,
          ...params
        })
        .where({id: ctx.params.id})
        .eager('')
    })
    
    user.delete('/:id', async (ctx) => {
      const {User} = ctx.state.models
      await User.query()
        .delete()
        .where({id: ctx.params.id})
      ctx.body = null
    })
    
    /* mat Custom actions [start] */
    /* mat Custom actions [end] */
    
    export default {
      routes: () => _.cloneDeep(user.routes()),
      register: (routers) => {
        /* mat Register [start] */
        /* mat Register [end] */
      }
    }

  `

  t.is(format(code), format(expected))
})

test('should create koa Base with custom prefix', async (t) => {
  const code = Route({
    model: 'user',
    config: {
      prefix: '/hoge/fuga/users'
    }
  })

  const expected = build`
    import Router from 'koa-router'
    import _ from 'lodash'
    
    const user = new Router({
      prefix: '/hoge/fuga/users'
    })
    
    user.get('/', async (ctx) => {
      const {User} = ctx.state.models
      let params = {}
    
      /* mat Before index [start] */
      /* mat Before index [end] */
    
      ctx.body = await User.query()
        .eager('')
        .where(params)
    })
    
    user.get('/:id', async (ctx) => {
      const {User} = ctx.state.models
      let params = {}
    
      /* mat Before show [start] */
      /* mat Before show [end] */
    
      ctx.body = await User.query()
        .eager('')
        .findFirst({...params, id: ctx.params.id})
    })
    
    user.post('/', async (ctx) => {
      const {User} = ctx.state.models
      const {user} = ctx.request.body
    
      let params = {}
    
      /* mat Before create [start] */
      /* mat Before create [end] */
    
      let response = await User.query()
        .insert({
          ...user,
          ...params
        })
        .eager('')
    
      /* mat After create [start] */
      /* mat After create [end] */
    
      ctx.body = response
    })
    
    user.put('/:id', async (ctx) => {
      const {User} = ctx.state.models
      const {user} = ctx.request.body
      const {sub} = ctx.state.user
    
      // update specified user.
      const params = {}
    
      /* mat Before update [start] */
      /* mat Before update [end] */
    
      ctx.body = await User.query()
        .update({
          ...user,
          ...params
        })
        .where({id: ctx.params.id})
        .eager('')
    })
    
    user.delete('/:id', async (ctx) => {
      const {User} = ctx.state.models
      await User.query()
        .delete()
        .where({id: ctx.params.id})
      ctx.body = null
    })
    
    /* mat Custom actions [start] */
    /* mat Custom actions [end] */
    
    export default {
      routes: () => _.cloneDeep(user.routes()),
      register: (routers) => {
        /* mat Register [start] */
        /* mat Register [end] */
      }
    }

  `

  t.is(format(code), format(expected))
})