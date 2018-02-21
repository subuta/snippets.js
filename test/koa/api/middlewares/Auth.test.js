/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Auth from 'lib/koa/api/middlewares/Auth'

describe('koa/api/middlewares/Auth', () => {
  it('should create koa Auth', () => {
    expect(format(Auth())).toMatchSnapshot()
  })
})
