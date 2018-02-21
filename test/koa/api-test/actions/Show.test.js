/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import ShowTest from 'lib/koa/api-test/actions/Show'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api-test/actions/Show', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should Show koa Show action test', () => {
    expect(format(ShowTest({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
