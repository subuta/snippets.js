import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import DeleteAction from 'lib/koa/api/actions/Delete'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = DeleteAction({
    model: 'User',
    config: {}
  })

  const expected = build`
    Users.delete('/:id', async (ctx) => {
      const {User} = ctx.state.models
      await User.query()
        .delete()
        .where({id: ctx.params.id})
      ctx.body = null
    })
  `

  t.is(format(code), format(expected))
})