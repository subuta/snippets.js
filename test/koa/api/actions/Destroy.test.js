/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import DestroyAction from 'lib/koa/api/actions/Destroy'

describe('koa/api/actions/Destroy', () => {
  it('should Destroy koa action', () => {
    expect(format(DestroyAction({
      model: 'user',
      routeConfig: {}
    }))).toMatchSnapshot()
  })
})
