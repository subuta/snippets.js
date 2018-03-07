/* global expect, describe, it */

import { build, format, snippets as s } from 'bld.js'

import Route from 'lib/koa/api/Route'

import { Routes as RoutesConfig, Models as ModelsConfig } from 'test/fixtures/config'

describe('koa/api/Route', () => {
  it('should create koa Route', () => {
    expect(format(Route({
      model: 'user',
      routeConfig: RoutesConfig.user,
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })

  it('should create koa Route with custom prefix', () => {
    expect(format(Route({
      model: 'user',
      routeConfig: {
        prefix: '/hoge/fuga/users'
      },
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })

  it('should create koa Route with skipAuth', () => {
    expect(format(Route({
      model: 'user',
      routeConfig: {
        prefix: '/hoge/fuga/users',
        skipAuth: [
          'index'
        ]
      },
      modelConfig: ModelsConfig.user
    }))).toMatchSnapshot()
  })
})
