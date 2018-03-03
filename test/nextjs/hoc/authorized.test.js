/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import authorized from 'lib/nextjs/hoc/authorized'

describe('nextjs/hoc/authorized', () => {
  it('should create Authorized hoc for next.js', () => {
    expect(format(authorized())).toMatchSnapshot()
  })
})
