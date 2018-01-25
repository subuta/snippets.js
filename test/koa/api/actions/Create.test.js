import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import CreateAction from 'lib/koa/api/actions/Create'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = CreateAction({
    model: 'user',
    config: {}
  })

  const expected = build`
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
  `

  t.is(format(code), format(expected))
})