import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import ShowAction from 'lib/koa/api/actions/Show'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = ShowAction({
    model: 'user',
    config: {}
  })

  const expected = build`
    user.get('/:id', async (ctx) => {
      const {User} = ctx.state.models
      let params = {}
    
      /* mat Before show [start] */
      /* mat Before show [end] */
    
      ctx.body = await User.query()
        .eager('')
        .findFirst({...params, id: ctx.params.id})
    })
  `

  t.is(format(code), format(expected))
})