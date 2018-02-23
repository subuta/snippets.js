/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Fixtures from 'lib/_test-helpers/KnexFixtures'

describe('_test-helpers/KnexFixtures', () => {
  it('should create knex Fixtures', () => {
    expect(format(Fixtures())).toMatchSnapshot()
  })
})
