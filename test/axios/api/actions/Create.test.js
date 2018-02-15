/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import CreateAction from 'lib/axios/api/actions/Create'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

describe('axios/api/actions/Create', () => {
  it('should create axios Api create action with channel', () => {
    const channelRoute = RoutesConfig['channel']
    const channelModel = ModelsConfig['channel']

    expect(format(CreateAction(channelRoute, channelModel))).toMatchSnapshot()
  })

  it('should create axios Api create action with comment', () => {
    const channelRoute = RoutesConfig['comment']
    const channelModel = ModelsConfig['comment']

    expect(format(CreateAction(channelRoute, channelModel))).toMatchSnapshot()
  })
})
