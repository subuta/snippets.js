/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Routes from 'lib/koa/api'

import { Routes as RoutesConfig } from 'test/fixtures/config'

describe('knex/api/index', () => {
  it('should create koa Base', () => {
    expect(format(Routes(RoutesConfig))).toMatchSnapshot()
  })
})
