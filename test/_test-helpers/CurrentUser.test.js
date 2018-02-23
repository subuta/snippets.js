/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'
import _ from 'lodash'

import CurrentUser from 'lib/_test-helpers/CurrentUser'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

import { generateSeeds } from 'lib/_utils/generateSeed'

describe('_test-helpers/CurrentUser', () => {
  it('should create currentUser payload', () => {
    expect(format(CurrentUser())).toMatchSnapshot()
  })

  it('should create currentUser payload with customSub', () => {
    const userSeed = _.first(generateSeeds(ModelsConfig.user, ModelsConfig.user.seeds))
    expect(format(CurrentUser(userSeed.auth0Id))).toMatchSnapshot()
  })
})
