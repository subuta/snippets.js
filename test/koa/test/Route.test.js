/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import RouteTest from 'lib/koa/test/Route'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/test/Route', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should create koa Route', () => {
    expect(format(RouteTest({
      model: 'comment',
      routesConfig: RoutesConfig,
      modelsConfig: ModelsConfig
    }))).toMatchSnapshot()
  })
})
