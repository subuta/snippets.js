/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Store from 'lib/redux/spa/Store'

describe('redux/spa/Store', () => {
  it('should create redux Store for SPA', () => {
    expect(format(Store())).toMatchSnapshot()
  })
})
