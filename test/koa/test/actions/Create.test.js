/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import CreateTest from 'lib/koa/test/actions/Create'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/test/actions/Create', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should create koa Create action test', () => {
    expect(format(CreateTest({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
