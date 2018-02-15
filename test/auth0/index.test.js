/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import auth0 from 'lib/auth0'

describe('auth0/index', () => {
  it('should create auth0 index', () => {
    expect(format(auth0())).toMatchSnapshot()
  })
})
