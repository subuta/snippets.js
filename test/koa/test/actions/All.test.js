/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import AllTest from 'lib/koa/test/actions/All'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/test/actions/All', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should create koa Index(All) action test', () => {
    expect(format(AllTest({
      model: 'user',
      routesConfig: RoutesConfig,
      modelsConfig: ModelsConfig
    }))).toMatchSnapshot()
  })

  it('should create koa Index(All) action test with prefix', () => {
    expect(format(AllTest({
      model: 'comment',
      routesConfig: RoutesConfig,
      modelsConfig: ModelsConfig
    }))).toMatchSnapshot()
  })
})
