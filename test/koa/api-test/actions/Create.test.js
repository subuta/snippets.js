/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import CreateTest from 'lib/koa/api-test/actions/Create'

describe('koa/api-test/actions/Create', () => {
  it('should create koa Create action test', () => {
    expect(format(CreateTest({
      model: 'user',
      config: {}
    }))).toMatchSnapshot()
  })
})
