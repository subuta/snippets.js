/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Seed from 'lib/knex/Seed'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('knex/Seed', () => {
  it('should create knex seed', () => {
    expect(format(Seed({
      model: 'user',
      routesConfig: RoutesConfig,
      modelsConfig: ModelsConfig
    }))).toMatchSnapshot()
  })

  it('should create knex seed for junction table', () => {
    expect(format(Seed({
      model: 'articleTag',
      routesConfig: RoutesConfig,
      modelsConfig: ModelsConfig
    }))).toMatchSnapshot()
  })
})
