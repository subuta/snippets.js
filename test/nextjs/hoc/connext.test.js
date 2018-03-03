/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import connext from 'lib/nextjs/hoc/connext'

describe('nextjs/hoc/connext', () => {
  it('should create Connext hoc for next.js', () => {
    expect(format(connext())).toMatchSnapshot()
  })
})
