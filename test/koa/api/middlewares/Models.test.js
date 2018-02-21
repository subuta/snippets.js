/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Models from 'lib/koa/api/middlewares/Models'

describe('koa/api/middlewares/Models', () => {
  it('should create koa Models', () => {
    expect(format(Models())).toMatchSnapshot()
  })
})
