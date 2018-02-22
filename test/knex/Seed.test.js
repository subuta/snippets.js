/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Seed from 'lib/knex/Seed'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('knex/Entrypoint', () => {
  it('should create knex Entrypoint', () => {
    expect(format(Seed({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
