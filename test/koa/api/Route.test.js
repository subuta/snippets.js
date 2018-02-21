/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Route from 'lib/koa/api/Route'

describe('koa/api/Route', () => {
  it('should create koa Route', () => {
    expect(format(Route({
      model: 'user',
      routeConfig: {}
    }))).toMatchSnapshot()
  })

  it('should create koa Route with custom prefix', () => {
    expect(format(Route({
      model: 'user',
      routeConfig: {
        prefix: '/hoge/fuga/users'
      }
    }))).toMatchSnapshot()
  })
})
