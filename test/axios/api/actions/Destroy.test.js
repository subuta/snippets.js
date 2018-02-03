import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import DestroyAction from 'lib/axios/api/actions/Destroy'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create axios Api delete action with channel.', async (t) => {
  const channelRoute = RoutesConfig['channel']
  const channelModel = ModelsConfig['channel']

  const code = DestroyAction(channelRoute, channelModel)

  const expected = build`
    export const destroy = (id) => {
      return request.delete(\`/channels/\${id}\`)
    }
  `

  t.is(format(code), format(expected))
})

test('should create axios Api delete action with comment.', async (t) => {
  const channelRoute = RoutesConfig['comment']
  const channelModel = ModelsConfig['comment']

  const code = DestroyAction(channelRoute, channelModel)

  const expected = build`
    export const destroy = (id, params) => {
      return request.delete(\`/channels/\$\{params.channelId\}/comments/\$\{id\}\`)
    }
  `

  t.is(format(code), format(expected))
})