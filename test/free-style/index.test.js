/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import freeStyle from 'lib/free-style'

describe('free-style/index', () => {
  it('should create free-style index', () => {
    expect(format(freeStyle())).toMatchSnapshot()
  })
})
