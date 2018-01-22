import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import AllAction from 'lib/koa/api/actions/All'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = AllAction({
    model: 'User',
    config: {}
  })

  const expected = build`
    Users.get('/', async (ctx) => {
      const {User} = ctx.state.models
      let params = {}
      
      /* mat Before index [start] */
      /* mat Before index [end] */
      
      ctx.body = await User.query()
        .eager('')
        .where(params)
    })
  `

  t.is(format(code), format(expected))
})