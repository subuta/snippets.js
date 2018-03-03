/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import knexfile from 'lib/knex/knexfile'

describe('knex/knexfile', () => {
  it('should create knexfile', () => {
    expect(format(knexfile())).toMatchSnapshot()
  })
})
