import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import ShowAction from 'lib/axios/api/actions/Show'

import {
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create axios Api index action.', async (t) => {
  const code = ShowAction(ModelsConfig['channel'])

  const expected = build`
    export const show = (id) => {
      return request.get(\`/channels/\${id}\`).then((data) => normalize(data, channel))
    }
  `

  t.is(format(code), format(expected))
})