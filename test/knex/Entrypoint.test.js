/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Entrypoint from 'lib/knex/Entrypoint'

describe('knex/Entrypoint', () => {
  it('should create knex Entrypoint', () => {
    expect(format(Entrypoint())).toMatchSnapshot()
  })
})
