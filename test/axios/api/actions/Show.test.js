/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import ShowAction from 'lib/axios/api/actions/Show'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

describe('axios/api/actions/Show', () => {
  it('should Show axios Api Show action with channel', () => {
    const channelRoute = RoutesConfig['channel']
    const channelModel = ModelsConfig['channel']

    expect(format(ShowAction(channelRoute, channelModel))).toMatchSnapshot()
  })

  it('should Show axios Api Show action with comment', () => {
    const channelRoute = RoutesConfig['comment']
    const channelModel = ModelsConfig['comment']

    expect(format(ShowAction(channelRoute, channelModel))).toMatchSnapshot()
  })
})
