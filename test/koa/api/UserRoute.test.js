/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import UserRoute from 'lib/koa/api/UserRoute'

describe('knex/api/UserRoute', () => {
  it('should create koa UserRoute', () => {
    expect(format(UserRoute({
      model: 'user',
      config: {}
    }))).toMatchSnapshot()
  })
})
