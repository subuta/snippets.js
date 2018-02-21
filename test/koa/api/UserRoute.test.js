/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import UserRoute from 'lib/koa/api/UserRoute'

import { Routes as RoutesConfig } from 'test/fixtures/config'

describe('koa/api/UserRoute', () => {
  it('should create koa UserRoute', () => {
    expect(format(UserRoute({
      model: 'user',
      routeConfig: RoutesConfig.user
    }))).toMatchSnapshot()
  })
})
