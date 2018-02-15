/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import ShowAction from 'lib/koa/api/actions/Show'

describe('knex/api/actions/Show', () => {
  it('should Show koa action', () => {
    expect(format(ShowAction({
      model: 'user',
      config: {}
    }))).toMatchSnapshot()
  })
})
