/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import AllAction from 'lib/koa/api/actions/All'

describe('knex/api/actions/All', () => {
  it('should create koa action', () => {
    expect(format(AllAction({
      model: 'user',
      config: {}
    }))).toMatchSnapshot()
  })
})
