/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import IndexTest from 'lib/koa/test'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/test/UserRoute', () => {
  beforeEach(() => {
  })

  afterEach(() => {
  })

  it('should create koa UserRoute', () => {
    expect(format(IndexTest(RoutesConfig, ModelsConfig))).toMatchSnapshot()
  })
})
