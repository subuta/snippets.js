/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Model from 'lib/objection/Model'

describe('objection/Model', () => {
  it('should create objection Child', () => {
    expect(format(Model())).toMatchSnapshot()
  })
})
