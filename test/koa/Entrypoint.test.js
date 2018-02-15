/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Entrypoint from 'lib/koa/Entrypoint'

describe('knex/Entrypoint', () => {
  it('should create koa Entrypoint', () => {
    expect(format(Entrypoint())).toMatchSnapshot()
  })
})
