/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import AllAction from 'lib/koa/api/actions/All'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api/actions/All', () => {
  it('should create koa action', () => {
    expect(format(AllAction({
      model: 'article',
      routeConfig: RoutesConfig.article,
      modelConfig: ModelsConfig.article
    }))).toMatchSnapshot()
  })
})
