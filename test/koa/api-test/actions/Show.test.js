/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import ShowTest from 'lib/koa/api-test/actions/Show'

describe('koa/api-test/actions/Show', () => {
  it('should Show koa Show action test', () => {
    expect(format(ShowTest({
      model: 'user',
      config: {}
    }))).toMatchSnapshot()
  })
})
