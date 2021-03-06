/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import DestroyTest from 'lib/koa/test/actions/Destroy'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/test/actions/Destroy', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should Destroy koa Destroy action test', () => {
    expect(format(DestroyTest({
      model: 'user',
      routesConfig: RoutesConfig,
      modelsConfig: ModelsConfig
    }))).toMatchSnapshot()
  })
})
