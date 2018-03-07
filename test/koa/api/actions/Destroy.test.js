/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import DestroyAction from 'lib/koa/api/actions/Destroy'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api/actions/Destroy', () => {
  it('should Destroy koa action', () => {
    expect(format(DestroyAction({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
