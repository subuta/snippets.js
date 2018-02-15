/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import UpdateAction from 'lib/axios/api/actions/Update'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

describe('axios/api/actions/Update', () => {
  it('should Update axios Api Update action with channel', () => {
    const channelRoute = RoutesConfig['channel']
    const channelModel = ModelsConfig['channel']

    expect(format(UpdateAction(channelRoute, channelModel))).toMatchSnapshot()
  })

  it('should Update axios Api Update action with comment', () => {
    const channelRoute = RoutesConfig['comment']
    const channelModel = ModelsConfig['comment']

    expect(format(UpdateAction(channelRoute, channelModel))).toMatchSnapshot()
  })
})
