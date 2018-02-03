import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import ShowAction from 'lib/axios/api/actions/Show'

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

  const code = ShowAction(channelRoute, channelModel)

  const expected = build`
    export const show = (id) => {
      return request.get(\`/channels/\${id}\`).then((data) => normalize(data, channel))
    }
  `

  t.is(format(code), format(expected))
})

test('should create axios Api index action with comment.', async (t) => {
  const channelRoute = RoutesConfig['comment']
  const channelModel = ModelsConfig['comment']

  const code = ShowAction(channelRoute, channelModel)

  const expected = build`
    export const show = (id, params) => {
      return request.get(\`/channels/\$\{params.channelId\}/comments/\$\{id\}\`).then((data) => normalize(data, comment))
    }
  `

  t.is(format(code), format(expected))
})