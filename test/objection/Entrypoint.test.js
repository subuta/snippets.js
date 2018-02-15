/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Entrypoint from 'lib/objection/Entrypoint'

describe('objection/Entrypoint', () => {
  it('should create objection Entrypoint', () => {
    expect(format(Entrypoint({modelDir: 'src/model'}))).toMatchSnapshot()
  })
})
