import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import IndexAction from 'lib/axios/api/actions/All'

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

  const code = IndexAction(channelRoute, channelModel)

  const expected = build`
    export const index = () => {
      return request.get(\`/channels\`)
    }
  `

  t.is(format(code), format(expected))
})

test('should create axios Api index action with comment.', async (t) => {
  const channelRoute = RoutesConfig['comment']
  const channelModel = ModelsConfig['comment']

  const code = IndexAction(channelRoute, channelModel)

  const expected = build`
    export const index = (params) => {
      const {channelId} = params
      return request.get(\`/channels/\$\{channelId\}/comments\`)
    }
  `

  t.is(format(code), format(expected))
})