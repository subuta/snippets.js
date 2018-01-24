import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import UpdateAction from 'lib/axios/api/actions/Update'

import {
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {
})

test.afterEach((t) => {
})

test('should create axios Api index action.', async (t) => {
  const code = UpdateAction(ModelsConfig['channel'])

  const expected = build`
    export const update = (params, id) => {
      return request
        .put(\`/channels/\${id}\`, {
          channel: params
        })
        .then((data) => normalize(data, channel))
    }
  `

  t.is(format(code), format(expected))
})