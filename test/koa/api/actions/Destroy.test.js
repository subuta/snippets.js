import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import DestroyAction from 'lib/koa/api/actions/Destroy'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = DestroyAction({
    model: 'user',
    config: {}
  })

  const expected = build`
    user.delete('/:id', async (ctx) => {
      const {User} = ctx.state.models
      await User.query()
        .delete()
        .where({id: ctx.params.id})
      ctx.body = null
    })
  `

  t.is(format(code), format(expected))
})