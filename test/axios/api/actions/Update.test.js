import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import UpdateAction from 'lib/axios/api/actions/Update'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {
})

test.afterEach((t) => {
})

test('should create axios Api index action with channel.', async (t) => {
  const channelRoute = RoutesConfig['channel']
  const channelModel = ModelsConfig['channel']

  const code = UpdateAction(channelRoute, channelModel)

  const expected = build`
    export const update = (id, params) => {
      return request
        .put(\`/channels/\${id}\`, {
          channel: params
        })
    }
  `

  t.is(format(code), format(expected))
})

test('should create axios Api index action with comment.', async (t) => {
  const channelRoute = RoutesConfig['comment']
  const channelModel = ModelsConfig['comment']

  const code = UpdateAction(channelRoute, channelModel)

  const expected = build`
    export const update = (id, params) => {
      return request
        .put(\`/channels/\$\{params.channelId\}/comments/\$\{id\}\`, {
          comment: params
        })
    }
  `

  t.is(format(code), format(expected))
})