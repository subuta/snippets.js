import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import DestroyAction from 'lib/axios/api/actions/Destroy'

import {
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create axios Api delete action.', async (t) => {
  const code = DestroyAction(ModelsConfig['channel'])

  const expected = build`
    export const destroy = (id) => {
      return request.delete(\`/channels/\${id}\`)
    }
  `

  t.is(format(code), format(expected))
})