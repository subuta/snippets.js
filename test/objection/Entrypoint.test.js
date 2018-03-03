/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Entrypoint from 'lib/objection/Entrypoint'
import { Models as ModelsConfig } from 'test/fixtures/config'

describe('objection/Entrypoint', () => {
  it('should create objection Entrypoint', () => {
    expect(format(Entrypoint(ModelsConfig))).toMatchSnapshot()
  })
})
