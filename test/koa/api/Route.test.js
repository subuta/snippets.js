/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Route from 'lib/koa/api/Route'

describe('knex/api/Route', () => {
  it('should create koa Route', () => {
    expect(format(Route({
      model: 'user',
      config: {}
    }))).toMatchSnapshot()
  })

  it('should create koa Route with custom prefix', () => {
    expect(format(Route({
      model: 'user',
      config: {
        prefix: '/hoge/fuga/users'
      }
    }))).toMatchSnapshot()
  })
})
