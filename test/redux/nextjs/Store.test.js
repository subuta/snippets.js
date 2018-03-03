/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Store from 'lib/redux/nextjs/Store'

describe('redux/spa/Store', () => {
  it('should create redux Store for next.js', () => {
    expect(format(Store())).toMatchSnapshot()
  })
})
