/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import AllTest from 'lib/koa/api-test/actions/All'

describe('koa/api-test/actions/All', () => {
  it('should create koa Index(All) action test', () => {
    expect(format(AllTest({
      model: 'user',
      config: {}
    }))).toMatchSnapshot()
  })
})
