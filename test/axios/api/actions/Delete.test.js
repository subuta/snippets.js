import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import DeleteAction from 'lib/axios/api/actions/Delete'

import {
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create axios Api delete action.', async (t) => {
  const code = DeleteAction(ModelsConfig['channel'])

  const expected = build`
    export const destroy = (id) => {
      return request.delete(\`/channels/\${id}\`)
    }
  `

  t.is(format(code), format(expected))
})