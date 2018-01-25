import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import UpdateAction from 'lib/koa/api/actions/Update'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = UpdateAction({
    model: 'user',
    config: {}
  })

  const expected = build`
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

  `

  t.is(format(code), format(expected))
})