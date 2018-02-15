/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import IndexAction from 'lib/axios/api/actions/All'

import {
  Routes as RoutesConfig,
  Models as ModelsConfig
} from 'test/fixtures/config'

describe('axios/api/actions/All', () => {
  it('should create axios Api index action with channel', () => {
    const channelRoute = RoutesConfig['channel']
    const channelModel = ModelsConfig['channel']

    expect(format(IndexAction(channelRoute, channelModel))).toMatchSnapshot()
  })

  it('should create axios Api index action with comment', () => {
    const channelRoute = RoutesConfig['comment']
    const channelModel = ModelsConfig['comment']

    expect(format(IndexAction(channelRoute, channelModel))).toMatchSnapshot()
  })
})
