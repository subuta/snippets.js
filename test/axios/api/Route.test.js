/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Route from 'lib/axios/api/Route'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

describe('axios/api/Route', () => {
  it('should create axios Route with channel', () => {
    const channelRoute = RoutesConfig['channel']
    const channelModel = ModelsConfig['channel']

    expect(format(Route(channelRoute, channelModel))).toMatchSnapshot()
  })
})
