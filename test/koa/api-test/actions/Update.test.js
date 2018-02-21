/* global expect, describe, it, beforeEach, afterEach */

import { build, format, snippets as s } from 'bld.js'

import UpdateTest from 'lib/koa/api-test/actions/Update'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'
import sinon from 'sinon'

describe('koa/api-test/actions/Update', () => {
  let clock

  beforeEach(() => {
    clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should Update koa Update action test', () => {
    expect(format(UpdateTest({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
