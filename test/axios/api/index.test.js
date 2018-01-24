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
    import channels from "./channels"
    import comments from "./comments"
    import attachments from "./attachments"
    import users from "./users"
        
    export default {
      channels,
      comments,
      attachments,
      users
    }
  `

  t.is(format(code), format(expected))
})