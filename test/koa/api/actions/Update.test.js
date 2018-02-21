/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import UpdateAction from 'lib/koa/api/actions/Update'

describe('koa/api/actions/Update', () => {
  it('should Update koa action', () => {
    expect(format(UpdateAction({
      model: 'user',
      routeConfig: {}
    }))).toMatchSnapshot()
  })
})
