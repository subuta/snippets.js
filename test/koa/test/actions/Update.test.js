/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import UpdateTest from 'lib/koa/test/actions/Update'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/test/actions/Update', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should Update koa Update action test', () => {
    expect(format(UpdateTest({
      model: 'user',
      routesConfig: RoutesConfig,
      modelsConfig: ModelsConfig
    }))).toMatchSnapshot()
  })
})
