/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import next from 'lib/nextjs/util'

describe('nextjs/hoc/connext', () => {
  it('should create util for next.js', () => {
    expect(format(next())).toMatchSnapshot()
  })
})
