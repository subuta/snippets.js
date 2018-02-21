/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import Routes from 'lib/koa/api'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'
import sinon from 'sinon'

describe('koa/api/index', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should create koa Base', () => {
    expect(format(Routes(RoutesConfig, ModelsConfig))).toMatchSnapshot()
  })
})
