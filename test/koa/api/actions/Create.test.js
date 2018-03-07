/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import CreateAction from 'lib/koa/api/actions/Create'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api/actions/Create', () => {
  it('should create koa action', () => {
    expect(format(CreateAction({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
