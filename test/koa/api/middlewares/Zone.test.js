/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Zone from 'lib/koa/api/middlewares/Zone'

describe('koa/api/middlewares/Auth', () => {
  it('should create koa Zone middleware', () => {
    expect(format(Zone())).toMatchSnapshot()
  })
})
