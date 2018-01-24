import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import IndexAction from 'lib/axios/api/actions/All'

import {
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create axios Api index action.', async (t) => {
  const code = IndexAction(ModelsConfig['channel'])

  const expected = build`
    export const index = () => {
      return request.get(\`/channels\`).then((data) => normalize(data, channelList))
    }
  `

  t.is(format(code), format(expected))
})