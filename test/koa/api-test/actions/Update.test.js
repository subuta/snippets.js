/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import UpdateTest from 'lib/koa/api-test/actions/Update'

describe('koa/api-test/actions/Update', () => {
  it('should Update koa Update action test', () => {
    expect(format(UpdateTest({
      model: 'user',
      config: {}
    }))).toMatchSnapshot()
  })
})
