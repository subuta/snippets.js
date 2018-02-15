/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Routes from 'lib/react/components/Routes'

describe('react/components/Routes', () => {
  it('should create react Routes', () => {
    expect(format(Routes())).toMatchSnapshot()
  })
})
