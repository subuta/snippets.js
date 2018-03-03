/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import nextConfig from 'lib/nextjs/next.config'

describe('nextjs/next.config.js', () => {
  it('should create config for next.js', () => {
    expect(format(nextConfig())).toMatchSnapshot()
  })
})
