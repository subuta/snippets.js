/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import UserRouteTest from 'lib/koa/test/UserRoute'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api/UserRoute', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should create koa UserRoute', () => {
    expect(format(UserRouteTest({
      model: 'user',
      routesConfig: RoutesConfig,
      modelsConfig: ModelsConfig
    }))).toMatchSnapshot()
  })
})
