/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import Routes from 'lib/koa/api'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api/index', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should create koa Base', () => {
    expect(format(Routes(RoutesConfig, ModelsConfig))).toMatchSnapshot()
  })
})
