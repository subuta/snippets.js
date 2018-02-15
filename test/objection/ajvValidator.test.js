/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import ajvValidator from 'lib/objection/ajvValidator'

describe('objection/ajvValidator', () => {
  it('should create objection ajvValidator', () => {
    expect(format(ajvValidator())).toMatchSnapshot()
  })
})
