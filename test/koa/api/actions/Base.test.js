import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Base from 'lib/koa/api/actions/Base'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Base', async (t) => {
  const code = Base({
    model: 'User',
    config: {},
    path: '/',
    method: 'post'
  })

  const expected = build`
    Users.post('/', async (ctx) => {
      const {User} = ctx.state.models
    })
  `

  t.is(format(code), format(expected))
})