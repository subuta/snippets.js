/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Base from 'lib/koa/api/actions/Base'

describe('koa/api/actions/Base', () => {
  it('should create koa action', () => {
    expect(format(Base({
      model: 'user',
      routeConfig: {},
      path: '/',
      method: 'post'
    }))).toMatchSnapshot()
  })
})
