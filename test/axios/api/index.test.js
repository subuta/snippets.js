import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import ApiIndex from 'lib/axios/api'

import { Routes as RoutesConfig } from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create axios Api index.', async (t) => {
  const code = ApiIndex(RoutesConfig)

  const expected = build`
    import channel from "./channel"
    import comment from "./comment"
    import attachment from "./attachment"
    import user from "./user"
        
    export default {
      channel,
      comment,
      attachment,
      user
    }
  `

  t.is(format(code), format(expected))
})