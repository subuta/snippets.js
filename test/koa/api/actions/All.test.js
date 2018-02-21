/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import AllAction from 'lib/koa/api/actions/All'

describe('koa/api/actions/All', () => {
  it('should create koa action', () => {
    expect(format(AllAction({
      model: 'user',
      routeConfig: {}
    }))).toMatchSnapshot()
  })
})
