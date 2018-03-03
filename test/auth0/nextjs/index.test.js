/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import auth0 from 'lib/auth0/nextjs'

describe('auth0/nextjs', () => {
  it('should create auth0 index for Single Page App', () => {
    expect(format(auth0())).toMatchSnapshot()
  })
})
