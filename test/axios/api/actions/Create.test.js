import test from 'ava'
import { build, format, snippets as s } from 'bld.js'

import CreateAction from 'lib/axios/api/actions/Create'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

test.beforeEach(async (t) => {

})

test.afterEach((t) => {
})

test('should create axios Api create action with channel.', async (t) => {
  const channelRoute = RoutesConfig['channel']
  const channelModel = ModelsConfig['channel']

  const code = CreateAction(channelRoute, channelModel)

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

test('should create axios Api create action with comment.', async (t) => {
  const channelRoute = RoutesConfig['comment']
  const channelModel = ModelsConfig['comment']

  const code = CreateAction(channelRoute, channelModel)

  const expected = build`
    export const create = (params) => {
      return request
        .post(\`/channels/\$\{params.channelId\}/comments\`, {
          comment: params
        })
        .then((data) => normalize(data, comment))
    }
  `

  t.is(format(code), format(expected))
})