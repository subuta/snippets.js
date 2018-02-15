/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import DestroyTest from 'lib/koa/api-test/actions/Destroy'

describe('koa/api-test/actions/Destroy', () => {
  it('should Destroy koa Destroy action test', () => {
    expect(format(DestroyTest({
      model: 'user',
      config: {}
    }))).toMatchSnapshot()
  })
})
