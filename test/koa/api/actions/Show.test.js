/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import ShowAction from 'lib/koa/api/actions/Show'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api/actions/Show', () => {
  it('should Show koa action', () => {
    expect(format(ShowAction({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
