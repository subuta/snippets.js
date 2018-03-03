/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import server from 'lib/nextjs/server'

describe('nextjs/server.js', () => {
  it('should create server for next.js', () => {
    expect(format(server())).toMatchSnapshot()
  })
})
