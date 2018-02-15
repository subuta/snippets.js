/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Entrypoint from 'lib/react-redux/Entrypoint'

describe('react-redux/Entrypoint', () => {
  it('should create react-redux Entrypoint', () => {
    expect(format(Entrypoint())).toMatchSnapshot()
  })
})
