/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import DestroyAction from 'lib/axios/api/actions/Destroy'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

describe('axios/api/actions/Destroy', () => {
  it('should Destroy axios Api Destroy action with channel', () => {
    const channelRoute = RoutesConfig['channel']
    const channelModel = ModelsConfig['channel']

    expect(format(DestroyAction(channelRoute, channelModel))).toMatchSnapshot()
  })

  it('should Destroy axios Api Destroy action with comment', () => {
    const channelRoute = RoutesConfig['comment']
    const channelModel = ModelsConfig['comment']

    expect(format(DestroyAction(channelRoute, channelModel))).toMatchSnapshot()
  })
})
