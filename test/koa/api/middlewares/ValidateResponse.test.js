/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import ValidateResponse from 'lib/koa/api/middlewares/ValidateResponse'

describe('koa/api/middlewares/ValidateResponse', () => {
  it('should create koa response validate middleware', () => {
    expect(format(ValidateResponse())).toMatchSnapshot()
  })
})
