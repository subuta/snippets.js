/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Store from 'lib/redux/Store'

describe('redux/Store', () => {
  it('should create redux Store', () => {
    expect(format(Store())).toMatchSnapshot()
  })
})
