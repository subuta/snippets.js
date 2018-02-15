/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Schema from 'lib/normalizr/Schema'

import { Models as ModelsConfig } from 'test/fixtures/config'

describe('normalizr/Schema', () => {
  it('should create normalizr Schema', () => {
    expect(format(Schema(ModelsConfig))).toMatchSnapshot()
  })
})
