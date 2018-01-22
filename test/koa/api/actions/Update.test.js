import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import UpdateAction from 'lib/koa/api/actions/Update'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = UpdateAction({
    model: 'User',
    config: {}
  })

  const expected = build`
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

  `

  t.is(format(code), format(expected))
})