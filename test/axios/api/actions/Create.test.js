import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import CreateAction from 'lib/axios/api/actions/Create'

import {
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create axios Api create action.', async (t) => {
  const code = CreateAction(ModelsConfig['channel'])

  const expected = build`
    export const create = (params) => {
      return request
        .post(\`/channels\`, {
          channel: params
        })
        .then((data) => normalize(data, channel))
    }
  `

  t.is(format(code), format(expected))
})