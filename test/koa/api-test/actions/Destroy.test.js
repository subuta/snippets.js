/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import DestroyTest from 'lib/koa/api-test/actions/Destroy'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api-test/actions/Destroy', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should Destroy koa Destroy action test', () => {
    expect(format(DestroyTest({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
