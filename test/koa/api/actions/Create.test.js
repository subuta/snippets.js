/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import CreateAction from 'lib/koa/api/actions/Create'

describe('koa/api/actions/Create', () => {
  it('should create koa action', () => {
    expect(format(CreateAction({
      model: 'user',
      routeConfig: {}
    }))).toMatchSnapshot()
  })
})
