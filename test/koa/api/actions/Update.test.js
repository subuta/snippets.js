/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import UpdateAction from 'lib/koa/api/actions/Update'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api/actions/Update', () => {
  it('should Update koa action', () => {
    expect(format(UpdateAction({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
