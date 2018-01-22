import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import Models from 'lib/koa/api/middlewares/Models'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create koa Auth', async (t) => {
  const code = Models()

  const expected = build`
    import models from 'src/model'

    export default (ctx, next) => {
      // expose Objection.js models to context.
      ctx.state.models = models
      return next()
    }
  `

  t.is(format(code), format(expected))
})