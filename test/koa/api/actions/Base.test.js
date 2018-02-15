/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Base from 'lib/koa/api/actions/Base'

describe('knex/api/actions/Base', () => {
  it('should create koa action', () => {
    expect(format(Base({
      model: 'user',
      config: {},
      path: '/',
      method: 'post'
    }))).toMatchSnapshot()
  })
})
